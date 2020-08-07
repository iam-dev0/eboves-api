import Products from "../models/Products";
import ProductsImages from "../models/ProductImages";
import ProductAttributes from "../models/ProductAttributes";
import sequelize, { Op } from "sequelize";
import status from "http-status";
import myconnect from "../db/db";
import { Request, Response } from "express";
import Brands from "../models/Brands";
import Attributes from "../models/Attributes";
import httpStatus from "http-status";
import ProductVariations from "../models/ProductVariations";
import { CreateVariationHelper, prepareWhere } from "../util/helpers";
import Categories from "../models/Categories";
import Suppliers from "../models/Supplier";
import ProductVariationsBarcodes from "../models/ProductVariationBarcodes";
import ProductVariationsImages from "../models/ProductVariationImages";
import moment from "moment";


export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  brandId?: number;
  sku?: string;
  createdAt?: string;
  productType?: string;
  supplierId?: string;
  pageSize?: string;
  current?: string;
}

export interface CreateProductBody {
  name: string;
  supplierId: string;
  brandId: number;
  productType: string;
  stackAvailableAt: string;
  subSubCategoryId?: string;
  description?: string;
  images?: { url: string; id?: number }[];
  attributes: string[];
}

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: SearchParams = req.query;
  let where = {};
  const order: any = [];
  if (params.name) {
    where = {
      ...where,
      [Op.or]: [
        {
          name: {
            [Op.like]: `${params.name}%`,
          },
        },
        {
          "$variations.sku$": {
            [Op.like]: `${params.name}%`,
          },
        },
      ],
    };
  }
  if (params.brandId) where = { ...where, brandId: params.brandId };
  if (params.productType) where = { ...where, productType: params.productType };
  if (params.supplierId) where = { ...where, supplierId: params.supplierId };
  if (params.active)
    where = { ...where, active: params.active.toLowerCase() === "true" };
  if (params.createdAt) where = { ...where, createdAt: params.createdAt };
  if (params.sorter) {
    const sorting = params.sorter.split("_");
    order.push([
      sorting[0],
      sorting[1].toLowerCase() === "ascend" ? "ASC" : "DESC",
    ]);
  }

  const data = await Products.findAndCountAll({
    include: [
      {
        model: ProductVariations,
        attributes: ["id", "sku", "price"] /*limit:1*/,
      },
    ], // For now as bug in sequlize
    limit: params.name ? undefined : parseInt(params.pageSize || "20"), // For now as bug in sequlize
    offset:
      parseInt(params.current || "1") * parseInt(params.pageSize || "20") -
      parseInt(params.pageSize || "20"),
    where,
    order,
  });

  return res.json({
    current: params.current,
    data: data.rows,
    pageSize: params.pageSize,
    success: true,
    total: data.count,
  });
};

export const getSingleProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: string = req.params.id;

  const data = await Products.findByPk(id, {
    include: [
      { model: ProductsImages },
      { model: Attributes.scope("basic") },
      { model: Brands.scope("basic") },
      { model: Suppliers },
    ],
  });

  return res.json({
    data: data,
  });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name,
    supplierId,
    brandId,
    productType,
    categoryId,
    description,
    howToUse,
    metaTitle,
    metaKeywords,
    metaDescription,
    images,
    attributes,
  }: any = req.body;

  try {
    const result = await myconnect.transaction(async (t) => {
      const product = await Products.create(
        {
          name,
          supplierId,
          brandId,
          productType,
          categoryId,
          description,
          howToUse,
          metaTitle,
          metaKeywords,
          metaDescription,
          createdBy: 1, // Hardcord for now
          updatedBy: 1, // Hardcord for now
        },
        { transaction: t }
      );

      if (attributes?.length > 0) {
        const attrs = attributes.map((i: any) => ({
          attributeId: i,
          productId: product.id,
        }));
        await ProductAttributes.bulkCreate(attrs, {
          transaction: t,
          fields: ["productId", "attributeId"],
        });
      }

      if (images?.length > 0) {
        const imgs = images.map((i: any) => ({
          image: i.url,
          productId: product.id,
        }));

        product.images = await ProductsImages.bulkCreate(imgs, {
          fields: ["productId", "image"],
          transaction: t,
        });
      }
      return product;
    });

    return res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      error: error,
    });
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    name,
    supplierId,
    brandId,
    productType,
    categoryId,
    description,
    howToUse,
    metaTitle,
    metaKeywords,
    metaDescription,
    images,
    attributes,
  }: any = req.body;
  const { id } = req.params;

  try {
    const result = await myconnect.transaction(async (t) => {
      const product = await Products.update(
        {
          name,
          supplierId,
          brandId,
          productType,
          categoryId,
          description,
          howToUse,
          metaTitle,
          metaKeywords,
          metaDescription,
          createdBy: 1, // Hardcord for now
          updatedBy: 1, // Hardcord for now
        },
        { where: { id }, transaction: t }
      );

      if (attributes?.length > 0) {
        await ProductAttributes.destroy({
          where: { productId: id },
          transaction: t,
        });

        const attrs = attributes.map((i: any) => ({
          attributeId: i,
          productId: id,
        }));

        await ProductAttributes.bulkCreate(attrs, {
          transaction: t,
          fields: ["productId", "attributeId"],
        });
      }

      if (images?.length > 0) {
        await ProductsImages.destroy({
          where: { productId: id },
          transaction: t,
        });
        const imgs = images.map((i: any) => ({
          image: i.url,
          productId: id,
        }));

        await ProductsImages.bulkCreate(imgs, {
          fields: ["productId", "image"],
          transaction: t,
        });
      }
      return product;
    });

    return res.status(status.CREATED).json({
      data: result,
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      error: error,
    });
  }
};

export const createVariations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const variations: any[] = req.body;
  const { id } = req.params;

  try {
    const result = await myconnect.transaction(async (t) => {
      const promises: Promise<unknown>[] = [];
      for (const variation of variations) {
        promises.push(CreateVariationHelper(variation, id, t));
      }

      const vs = await Promise.all(promises).then((values) => {
        // console.log(values);
        return values;
      });
      return vs;
    });
    return res.status(httpStatus.CREATED).json({ data: result });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log(error);
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      error: error,
    });
  }
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ids = req.query;
  const araryOfids: any[] = Object.values(ids);

  await Products.destroy({ where: { id: araryOfids } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).send();
};

export const toggleProductActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = Products.update(
    { active: sequelize.literal("NOT active") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};

export const toggleVariationActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { vid, pid } = req.params;

  const data = ProductVariations.update(
    { active: sequelize.literal("NOT active") },
    { where: { id: vid, productId: pid } }
  );

  return res.json({ success: true, data });
};

export const getVaraitions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { Pid } = req.params;

  const result = await ProductVariations.findAll({
    where: { productId: Pid },
    attributes: {
      include: [
        "id",
        "sku",
        "active",
        "createdAt",
        "price",
        [
          sequelize.fn(
            "product_variation_name",
            sequelize.col("ProductVariations.id")
          ),
          "name",
        ],
      ],
    },
  });

  return res.json({
    data: result,
  });
};

export const getVaraition = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { pid, vid } = req.params;

  const result = await ProductVariations.findByPk(vid, {
    include: [
      { model: ProductVariationsBarcodes },
      { model: Attributes },
      { model: ProductVariationsImages },
    ],
    attributes: {
      include: [
        [
          sequelize.fn(
            "product_variation_name",
            sequelize.col("ProductVariations.id")
          ),
          "name",
        ],
      ],
    },
  });

  return res.json({
    data: result,
  });
};

export const getProductFullInfo = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const result = await Products.findByPk(id, {
    include: [
      {
        model: ProductVariations,
        include: [
          { model: ProductVariationsBarcodes },
          { model: Attributes },
          { model: ProductVariationsImages },
        ],
        attributes: {
          include: [
            [
              sequelize.fn(
                "product_variation_name",
                sequelize.col("variations.id")
              ),
              "name",
            ],
          ],
        },
      },
      { model: ProductsImages },
      { model: Attributes },
      { model: Brands },
      { model: Categories },
      { model: Suppliers },
    ],
  });

  return res.json({
    data: result,
  });
};

//----------------------------------------Website's Controllers----------------------//
/**
      {
        model: Categories.scope("website"),
        include: [
          {
            model: Categories.scope("website"),
            as: "parent",
            include: [{ model: Categories.scope("website"), as: "parent" }],
          },
        ],
      },
 */

export const getMainTabs = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const featured = Products.scope("websiteListing").findAll({
    include: [
      {
        model: ProductVariations.scope("websiteListing"),
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
    ],
    where: { featured: true },
    limit: 10,
  });

  const onSale = Products.scope("websiteListing").findAll({
    include: [
      {
        model: ProductVariations.scope("websiteListing"),
        required: true,
        where: {
          discountEndTime: {
            [Op.gte]: moment().format("YYYY-MM-DD hh:mm:ss"),
          },
        },
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
    ],
    limit: 10,
  });

  const topRated = Products.scope("websiteListing").findAll({
    include: [
      {
        model: ProductVariations.scope("websiteListing"),
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
    ],
    where: { topRated: true },
    limit: 10,
  });

  const result = await Promise.all([
    featured,
    topRated,
    onSale,
  ]).then(([featured, topRated, onSale]) => ({ featured, topRated, onSale }));

  return res.json({
    data: result,
  });
};

export interface QureyParams {
  brandSlug?: number;
  categorySlug?: string;
  subCategorySlug?: string;
  subSubcategorySlug?: string;
  bestSeller?: string;
  trending?: string;
  topRated?: string;
  featured?: string;
  pvTrending?: string;
  pvTopRated?: string;
  pvFeatured?: string;
  productType?: string;
  pricelte?: string;
  pricegte?: string;
  pageSize?: string;
  current?: string;
}

export const getWebsiteProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: QureyParams = req.query;

  const { pWhere, pvWhere }: any = prepareWhere(params);

  const data = await Products.scope("websiteListing").findAll({
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("variations.id")), "count"],
      ],
    },
    include: [
      {
        model: Categories.scope("website"),
        where: params.subSubcategorySlug
          ? { slug: params.subSubcategorySlug }
          : {},
        include: [
          {
            model: Categories.scope("website"),
            where: params.subCategorySlug
              ? { slug: params.subCategorySlug }
              : {},
            as: "parent",
            include: [
              {
                model: Categories.scope("website"),
                as: "parent",
                where: params.categorySlug ? { slug: params.categorySlug } : {},
              },
            ],
          },
        ],
      },
      {
        model: Brands.scope("website"),
        where: params.brandSlug ? { slug: params.brandSlug } : {},
      },
      {
        model: ProductVariations.scope("websiteListing"),
        where: pvWhere,
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
    ],
    limit: parseInt(params.pageSize || "100"),
    // offset:
    //   parseInt(params.current || "1") * parseInt(params.pageSize || "100") -
    //   parseInt(params.pageSize || "20"),

    where: pWhere,
  });

  return res.json({
    current: parseInt(params.current || "1"),
    data: data.rows,
    pageSize: params.pageSize,
    success: true,
    total: data.count,
  });
};
