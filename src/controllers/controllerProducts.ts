import Products from "../models/Products";
import ProductsImages from "../models/ProductImages";
import ProductAttribute from "../models/ProductAttributes";
import { Op } from "sequelize";
import status from "http-status";
import myconnect from "../db/db";
import { Request, Response } from "express";
import Brands from "../models/Brands";
import Attributes from "../models/Attributes";
import { http } from "winston";
import httpStatus from "http-status";
import ProductVariations from "../models/ProductVariations";
import { any } from "bluebird";
export interface SearchParams {
  sorter?: string;
  status?: string;
  name?: string;
  brandId?: number;
  sku?: string;
  productType?: string;
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

export interface CreateVariationBody {
  sku: string;
  slug: string;
  price: number;
  attributes: [];
  barcodes: [];
}

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: SearchParams = req.query;

  let where = {};

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
      ]
    };
  }

  const data = await Products.findAndCountAll({
    limit: parseInt(params.pageSize || "20"),
    include: [{ model: ProductVariations, as:"variations" }],
    offset:
      parseInt(params.current || "1") * parseInt(params.pageSize || "20") -
      parseInt(params.pageSize || "20"),
    where,
   
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
      { model: Attributes.scope("basic") },
      { model: Brands.scope("basic") },
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
    stackAvailableAt,
    subSubCategoryId,
    description,
    images,
    attributes,
  }: CreateProductBody = req.body;

  try {
    const result = await myconnect.transaction(async (t) => {
      const product = await Products.create(
        {
          name,
          supplierId,
          brandId,
          productType,
          stackAvailableAt,
          categoryId: subSubCategoryId,
          description,
          createdBy: 1, // Hardcord for now
          updatedBy: 1, // Hardcord for now
        },
        { transaction: t }
      );

      if (attributes && attributes.length > 0) {
        const attrs = attributes?.map((i: any) => ({
          attributeId: i,
          productId: product.id,
        }));
        await ProductAttribute.bulkCreate(attrs, {
          transaction: t,
          fields: ["productId", "attributeId"],
        });
      }

      if (images && images.length > 0) {
        const imgs = images?.map((i: any) => ({
          image: i.url,
          productId: product.id,
        }));

        if (!imgs.find((i) => (!i.image ? true : false)))
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

export const createVariations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const variations: CreateVariationBody[] = req.body;
  const { id } = req.params;
  const varValues = variations?.map(
    ({ sku, slug, price }: CreateVariationBody) => ({
      productId: id,
      sku,
      slug,
      price,
      createdBy: 1, // Hardcord for now
      updatedBy: 1, // Hardcord for now
    })
  );
  try {
    const result = await myconnect.transaction(async (t) => {
      return await ProductVariations.bulkCreate(varValues, {
        transaction: t,
      });
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

export const updateProductStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const { active } = req.query;

  await Products.update(
    { active },
    {
      where: {
        id,
      },
    }
  );

  return res.json({
    success: true,
  });
};
