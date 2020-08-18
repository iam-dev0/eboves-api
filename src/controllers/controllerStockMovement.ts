import { Request, Response } from "express";
import httpStatus from "http-status";
import StockMovement from "../models/StockMovement";
import myconnect from "../db/db";
import StockMovementVariations from "../models/StockMovementVariations";
import Stocks from "../models/Stocks";
import ProductVariations from "../models/ProductVariations";
import sequelize from "sequelize";
import Outlets from "../models/Outlets";
import Suppliers from "../models/Supplier";
import pdfStockRequest from "../docs/StockRequest";
import pdf from "html-pdf";

export interface StockVariationStructure {
  id: number;
  supplierPrice: number;
  quantity: number;
}

export interface StockStructure {
  delieveryDate?: Date;
  note?: string;
  orderNumber?: string;
  outletId?: number;
  supplierId?: number;
  supplierInvoiceNumber?: string;
  variations?: StockVariationStructure[];
}

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await StockMovement.findAll();

  return res.json({ data });
};

export const createStockOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    delieveryDate,
    note,
    orderNumber,
    outletId,
    supplierId,
    supplierInvoiceNumber,
    variations,
  }: StockStructure = req.body;

  try {
    const result = await myconnect.transaction(async (t) => {
      const Data = {
        delieveryDate,
        note,
        orderNumber,
        outletId,
        supplierId,
        supplierInvoiceNumber,
        createdBy: 1, // Hardcord for now
        updatedBy: 1, // Hardcord for now
      };

      const stockrequest = await StockMovement.create(Data, { transaction: t });

      if (variations && variations?.length > 0) {
        const vars = variations.map(
          ({ id, quantity, supplierPrice }: StockVariationStructure) => ({
            stockMovementId: stockrequest.id,
            productVariationId: id,
            requestedQuantity: quantity,
            requestedPrice: supplierPrice,
          })
        );
        await StockMovementVariations.bulkCreate(vars, {
          transaction: t,
        });
      }

      return stockrequest;
    });

    return res.status(httpStatus.CREATED).json({ data: result });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error,
    });
  }
};

export const getOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id }: any = req.params;

  const data = await StockMovement.findByPk(id, {
    include: [
      {
        model: StockMovementVariations,
        include: [
          {
            required: true,
            model: ProductVariations,
            attributes: [
              "sku",
              [
                sequelize.fn(
                  "product_variation_name",
                  sequelize.col("variations->variation.id")
                ),
                "name",
              ],
              "price",
            ],
            include: [
              {
                model: Stocks,
                as: "stocks",
                // where:  { outletId:StockMovementVariations } ,
                attributes: ["id", "availableQuantity"],
              },
            ],
          },
        ],
      },
      { required: true, model: Outlets, attributes: ["id", "name"] },
      { required: true, model: Suppliers, attributes: ["id", "name"] },
    ],
    subQuery: false,
    plain: true,
  }).then((order) => {
    const {
      createdAt,
      createdBy,
      delieveryDate,
      supplierId,
      note,
      orderNumber,
      outletId,
      status,
      supplierInvoiceNumber,
      updatedAt,
      variations,
      supplier,
      outlet,
      updatedBy,
    }: any = order?.toJSON();

    return {
      createdAt,
      createdBy,
      delieveryDate,
      supplierId,
      note,
      orderNumber,
      outletId,
      status,
      supplierInvoiceNumber,
      updatedAt,
      updatedBy,
      supplier,
      outlet,
      variations: variations?.map(
        ({
          id,
          requestedQuantity,
          requestedPrice,
          receivedQuantity,
          receivedPrice,
          variation: { name, price, sku, stocks },
        }) => {
          const sum = 0;
          stocks?.forEach((item) =>
            item.id === outletId ? sum + item.availableQuantity : null
          );
          return {
            id,
            requestedQuantity,
            requestedPrice,
            receivedQuantity,
            receivedPrice,
            name,
            price,
            sku,
            availableQuantity: sum,
          };
        }
      ),
    };
  });

  return res.json({
    data: data,
  });
};

export const getPDF = async (req: Request, res: Response): Promise<any> => {
  const { id }: any = req.params;

  const data = await StockMovement.findByPk(id, {
    include: [
      {
        model: StockMovementVariations,
        include: [
          {
            required: true,
            model: ProductVariations,
            attributes: [
              "sku",
              [
                sequelize.fn(
                  "product_variation_name",
                  sequelize.col("variations->variation.id")
                ),
                "name",
              ],
              "price",
            ],
            include: [
              {
                model: Stocks,
                as: "stocks",
                // where:  { outletId:StockMovementVariations } ,
                attributes: ["id", "availableQuantity"],
              },
            ],
          },
        ],
      },
      { required: true, model: Outlets, attributes: ["id", "name"] },
      { required: true, model: Suppliers, attributes: ["id", "name"] },
    ],
    subQuery: false,
    plain: true,
  })
    .then((order) => {
      const {
        createdAt,
        createdBy,
        delieveryDate,
        supplierId,
        note,
        orderNumber,
        outletId,
        status,
        supplierInvoiceNumber,
        updatedAt,
        variations,
        supplier,
        outlet,
        updatedBy,
      }: any = order?.toJSON();

      return {
        createdAt,
        createdBy,
        delieveryDate,
        supplierId,
        note,
        orderNumber,
        outletId,
        status,
        supplierInvoiceNumber,
        updatedAt,
        updatedBy,
        supplier,
        outlet,
        variations: variations?.map(
          ({
            id,
            requestedQuantity,
            requestedPrice,
            receivedQuantity,
            receivedPrice,
            variation: { name, price, sku, stocks },
          }) => {
            const sum = 0;
            stocks?.forEach((item) =>
              item.id === outletId ? sum + item.availableQuantity : null
            );
            return {
              id,
              requestedQuantity,
              requestedPrice,
              receivedQuantity,
              receivedPrice,
              name,
              price,
              sku,
              availableQuantity: sum,
            };
          }
        ),
      };
    })
    .catch((err) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      });
    });

  const PDF: any = await new Promise((resolve, reject) =>
    pdf
      .create(pdfStockRequest(data), {})
      .toFile(
        `public/pdf/${data ? data.orderNumber : "StockMovement"}.pdf`,
        (err, file) => {
          if (err) reject(err);

          resolve(file);
        }
      )
  ).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  // console.log(PDF);

  return res
    .header({ type: "application/pdf" })
    .status(httpStatus.CREATED)
    .sendFile(PDF.filename);
};

// export const update = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { id } = req.params;
//   let values = req.body;
//   values = {
//     ...values,
//     createdBy: 1,
//     updatedBy: 1,
//   };
//   const data = await Suppliers.update(values, { where: { id } }).catch((err) =>
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: err.message,
//     })
//   );

//   return res.status(httpStatus.OK).json({ data });
// };

// export const bulkDelete = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const ids = req.query;
//   const araryOfids: any[] = Object.values(ids);
//   await Suppliers.destroy({ where: { id: araryOfids } }).catch((err) =>
//     res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//       message: err.message,
//     })
//   );

//   return res.status(httpStatus.OK).send();
// };

// export const toggleActiveStatus = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   const { id } = req.params;

//   const data = Suppliers.update(
//     { active: literal("NOT active") },
//     { where: { id: id } }
//   );

//   return res.json({ success: true, data });
// };
