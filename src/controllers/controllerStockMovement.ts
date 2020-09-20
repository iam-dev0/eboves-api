import { Request, Response, NextFunction } from "express";
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
import errorHandler from "errorhandler";

export interface StockVariationStructure {
  id: number;
  supplierPrice: number;
  quantity: number;
}

export interface StockStructure {
  delieveryDate?: Date;
  id: string;
  note?: string;
  orderNumber?: string;
  outletId: number;
  supplierId?: number;
  supplierInvoiceNumber?: string;
  variations: StockVariationStructure[];
}

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await StockMovement.findAll({
    include: [
      { model: Outlets, attributes: ["id", "name"] },
      { model: Suppliers, attributes: ["id", "companyName"] },
      { model: StockMovementVariations, attributes: ["id"] },
    ],
  }).catch((error) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error,
    })
  );

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
        // createdBy: 1, // Hardcord for now
        // updatedBy: 1, // Hardcord for now
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

export const receiveStockOrder = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    id,
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
        status: "RECEIVED",
        // createdBy: 1, // Hardcord for now
        // updatedBy: 1, // Hardcord for now
      };

      let stockrequest;
      if (id) {
        stockrequest = await StockMovement.findByPk(id, {
          transaction: t,
        }).then(async (item) => {
          if (!item) {
            return await StockMovement.create(Data, {
              transaction: t,
            });
          }

          // Item already exists, so we update it
          return await item.update(Data, { transaction: t });
        });
      } else {
        stockrequest = await StockMovement.create(Data, {
          transaction: t,
        });
      }

      const promises: Promise<unknown>[] = [];
      for (const { id, quantity, supplierPrice } of variations) {
        promises.push(
          new Promise(async (resolve, reject) => {
            try {
              const variation = await StockMovementVariations.findOne({
                where: {
                  stockMovementId: stockrequest.id,
                  productVariationId: id,
                },
                transaction: t,
              }).then(async (item) => {
                if (!item) {
                  return await StockMovementVariations.create(
                    {
                      stockMovementId: stockrequest.id,
                      productVariationId: id,
                      receivedQuantity: quantity,
                      receivedPrice: supplierPrice,
                    },
                    { transaction: t }
                  ).then((item) => ({ item, created: true }));
                }

                // Item already exists, so we update it
                return await item
                  .update(
                    {
                      stockMovementId: stockrequest.id,
                      productVariationId: id,
                      receivedQuantity: quantity,
                      receivedPrice: supplierPrice,
                    },
                    { transaction: t }
                  )
                  .then((item) => ({ item, created: false }));
              });

              resolve(variation);
            } catch (error) {
              reject(error);
              return;
            }
          })
        );
      }

      await Promise.all(promises).then(console.log);
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

export const updateStockOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { status } = req.query;
  const { id } = req.params;

  return await StockMovement.findByPk(id)
    .then(async (item) => {
      if (item) {
        await item.update({ status }).then((item) => item);
        return res.json({ success: true, data: item });
      }
      throw new Error("Sorry");
    })
    .catch(next);
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return await StockMovement.findByPk(id, {
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
                attributes: ["id", "availableQuantity","outletId"],
              },
            ],
          },
        ],
      },
      { required: true, model: Outlets, attributes: ["id", "name"] },
      { required: true, model: Suppliers, attributes: ["id", "companyName"] },
    ]
  })
    .then((order) => {
      return {
        ...order?.get(),
        variations: order?.variations?.map((vs) => {
          let sum = 0;
          vs.variation?.stocks?.forEach((item) =>
            item.outletId === order.outletId ? sum=sum + item.availableQuantity : null
          );
          return {
            ...vs.get(),
            ...vs.variation.get(),
            availableQuantity: sum,
          };
        }),
      };
    })
    .then((result) => {
      return res.json({
        data: result,
      });
    })
    .catch(next);
};

export const getPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const data: any = await StockMovement.findByPk(id, {
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
                  attributes: ["id", "availableQuantity","outletId"],
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
      return {
        ...order?.get(),
        variations: order?.variations?.map((vs) => {
          let sum = 0;
          vs.variation?.stocks?.forEach((item) =>
            item.id === order.outletId ? sum=sum + item.availableQuantity : null
          );
          return {
            ...vs.get(),
            ...vs.variation.get(),
            availableQuantity: sum,
          };
        }),
      };
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
    );

    // console.log(PDF);
    return res
      .header({ type: "application/pdf" })
      .status(httpStatus.CREATED)
      .sendFile(PDF.filename);
  } catch (error) {
    next(error);
  }
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
