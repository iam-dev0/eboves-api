import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Orders from "../models/Order";
import ProductVariations from "../models/ProductVariations";
import sequelize from "sequelize";
import Products from "../models/Products";
import Stocks from "../models/Stocks";
import moment from "moment";
import myconnect from "../db/db";
import ShippingInformation from "../models/ShippingInformation";
import OrderItems from "../models/OrderItems";

interface ShippingInformationStructure {
  name: string;
  email: string;
  phone: string;
  cityId: number;
  address: string;
}

interface OrderStucture {
  shippingInfo: ShippingInformationStructure;
  source: string;
  shippingMethod?: string;
  cart: { id: number; quantity: number }[];
  variations: any;
}
export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Orders.findAll();

  return res.json({ data });
};

export const getOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id }: any = req.params;

  const data = await Orders.findByPk(id, {
    include: [
      {
        model: OrderItems,
        attributes: {
          include: [
            [
              sequelize.fn(
                "product_variation_name",
                sequelize.col("products.productVariationId")
              ),
              "name",
            ],
          ],
        },
        include: [{ model: ProductVariations, attributes: ["sku"] }],
      },
      { model: ShippingInformation },
    ],
  }).then((data) => {
    return {
      ...data?.get(),
      products: data?.products.map((p) => {
        return {
          ...p.get(),
          sku: p.variation.sku,
        };
      }),
    };
  });

  return res.json({
    data: data,
  });
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { shippingInfo, source, variations }: OrderStucture = req.body;
  const { name, email, phone, cityId, address } = shippingInfo;
  let total = 0,
    actualAmount = 0,
    discountedPercentage = 0,
    discountedAmount = 0;
  const discountReason: string[] = [];

  for (const p of variations) {
    total = total + p.price;
    if (
      p.discountPercentage > 0 &&
      moment().isSameOrAfter(p.discountStartTime) &&
      moment().isSameOrBefore(p.discountEndTime)
    ) {
      actualAmount =
        actualAmount + (p.price - (p.price / 100) * p.discountPercentage);
      discountReason.push(p.discountReason);
    } else {
      actualAmount = actualAmount + p.price;
    }
  }

  if (total !== actualAmount) {
    discountedAmount = total - actualAmount;
    discountedPercentage = 100 - (actualAmount / total) * 100;
  }

  return await myconnect
    .transaction(async (t) => {
      const result = await ShippingInformation.create(
        {
          firstName: name,
          lastName: name,
          email,
          phone,
          cityId,
          address,
          order: {
            shippingCharges: 200,
            discountedPercentage,
            discountedAmount,
            amount: actualAmount,
            discountReason: discountReason.join(),
            source,
            outletId: 1, //-------Hard corded right now
            products: variations.map(
              ({
                id,
                productId,
                price,
                discountStartTime,
                discountEndTime,
                supplierPrice,
                discountPercentage,
                discountReason,
                quantity,
              }) => {
                if (
                  discountPercentage > 0 &&
                  moment().isSameOrAfter(discountStartTime) &&
                  moment().isSameOrBefore(discountEndTime)
                )
                  return {
                    productVariationid: id,
                    productId,
                    supplierPrice,
                    discountedPercentage: discountPercentage,
                    sellingPrice: (price / 100) * (100 - discountPercentage),
                    discountReason,
                    quantity,
                  };

                return {
                  productVariationid: id,
                  productId,
                  supplierPrice,
                  sellingPrice: price,
                  quantity,
                };
              }
            ),
          },
        },
        { include: [{ model: Orders, include: [OrderItems] }], transaction: t }
      );
      res
        .status(httpStatus.CREATED)
        .json({ success: true, data: { orderId: result.order.id } });
    })
    .catch(next);
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  let values = req.body;
  values = {
    ...values,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Orders.update(values, { where: { id } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data });
};

export const updateStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { status, ids } = req.body;
  return await Orders.update({ status }, { where: { id: ids } })
    .then((data) => {
      return res.status(httpStatus.OK).json({ success: true, data });
    })
    .catch((err) =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      })
    );
};

//------------------------Middlewares--------------------//
export const checkStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { cart }: OrderStucture = req.body;

  await ProductVariations.findAll({
    attributes: [
      "id",
      "productId",
      "supplierPrice",
      // "supplierId",
      "price",
      "discountPercentage",
      "discountReason",
      "discountStartTime",
      "discountEndTime",
      [
        sequelize.fn("SUM", sequelize.col("stocks.availableQuantity")),
        "availableQuantity",
      ],
    ],
    include: [
      {
        model: Stocks,
        // where: outletId ? { outletId } : {},
        attributes: [],
      },
    ],
    where: {
      id: cart.map((item) => item.id), // Active condition too
    },
    raw: true,
    subQuery: false,
    group: "id",
  })
    .then((variations) => {
      return cart.map((item) => {
        const elmt = variations.find((v) => v.id === item.id);
        if (elmt) {
          return {
            ...elmt,
            quantity: item.quantity,
            availableQuantity: elmt.availableQuantity,
          };
        }

        throw new Error("item not found");
      });
    })
    .then((v) => {
      if (v.find((v) => v.quantity > v.availableQuantity))
        return res.status(httpStatus.BAD_REQUEST).json({
          success: false,
          error: "Stock Problems",
          data: v.map((item) => {
            delete item.supplierPrice;
            return item;
          }),
        });

      req.body.variations = v;
      next();
    })
    .catch(next);
};
