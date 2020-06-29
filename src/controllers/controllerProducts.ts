import Products from "../models/Products";
import ProductsImages from "../models/ProductImages";
import ProductAttribute from "../models/ProductAttributes";
import { Op } from "sequelize";
import status from "http-status";
import myconnect from "../db/db";
import { Request, Response } from "express";
import Brands from "../models/Brands";
export interface TableListParams {
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

export const getProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: TableListParams = req.query;

  let where = {};

  if (params.name) {
    where = {
      ...where,
      name: {
        [Op.like]: `${params.name}%`,
      },
    };
  }
  console.log(params);
  const data = await Products.findAndCountAll({
    limit: parseInt(params.pageSize || "20"),
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

  const data = await Products.findByPk(id,{include: [{ model: ProductAttribute},{ model:Brands.scope("basic")}]});

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
        product.attributes = await ProductAttribute.bulkCreate(attrs, {
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
