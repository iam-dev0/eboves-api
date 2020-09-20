import Products from "../models/Products";
import ProductsImages from "../models/ProductImages";
import ProductAttributes from "../models/ProductAttributes";
import sequelize, { Op } from "sequelize";
import status from "http-status";
import myconnect from "../db/db";
import { Request, Response, NextFunction } from "express";
import Brands from "../models/Brands";
import Attributes from "../models/Attributes";
import httpStatus from "http-status";
import ProductVariations from "../models/ProductVariations";
import { prepareWhere } from "../util/helpers";
import Categories from "../models/Categories";
import Suppliers from "../models/Supplier";
import ProductVariationsBarcodes from "../models/ProductVariationBarcodes";
import ProductVariationsImages from "../models/ProductVariationImages";
import moment, { defineLocale } from "moment";
import ProductVariationAttributeValues from "../models/ProductVariationAttributeValues";
import Stocks from "../models/Stocks";


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
  res: Response,
  next: NextFunction
) => {
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

  try {
    const count = await Products.count({
      include: [
        {
          model: ProductVariations,
          attributes: [],
        },
      ],
      distinct: true,
      where,
    });

    const data = await Products.findAll({
      attributes: ["id", "name", "productType", "sku", "active", "createdAt"],
      include: [
        {
          model: ProductVariations,
          attributes: ["id", "price"],
        },
      ],
      limit: params.name ? undefined : parseInt(params.pageSize || "20"), // Sequelize Bug
      offset:
        parseInt(params.current || "1") * parseInt(params.pageSize || "20") -
        parseInt(params.pageSize || "20"),
      where,
      order,
    });

    return res.json({
      current: params.current,
      data: data,
      pageSize: params.pageSize,
      success: true,
      total: count,
    });
  } catch (err) {
    next(err);
  }
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
    additionalInformation,
    metaTitle,
    metaKeywords,
    metaDescription,
    images = [],
    attributes,
  }: any = req.body;

  try {
    const result = await myconnect.transaction(async (t) => {
      const productData = {
        name,
        supplierId,
        brandId,
        productType,
        categoryId,
        description,
        additionalInformation,
        metaTitle,
        mainImage: images ? images[0]?.url : null,
        metaKeywords,
        metaDescription,
        // createdBy: 1, // Hardcord for now
        // updatedBy: 1, // Hardcord for now
      };

      const product = await Products.create(productData, { transaction: t });

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

      if (images?.length > 1) {
        const imgs = images.map((i: any) => ({
          image: i.url,
          productId: product.id,
        }));

        product.images = await ProductsImages.bulkCreate(imgs.shift(), {
          fields: ["productId", "image"],
          transaction: t,
        });
      }
      return product;
    });

    return res.status(httpStatus.CREATED).json({
      data: result,
    });
  } catch (error) {
    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
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
    additionalInformation,
    metaTitle,
    metaKeywords,
    metaDescription,
    images,
    attributes,
  }: any = req.body;
  const { id } = req.params;

  try {
    const result = await myconnect.transaction(async (t) => {
      const productData = {
        name,
        supplierId,
        brandId,
        productType,
        categoryId,
        description,
        additionalInformation,
        metaTitle,
        mainImage: images ? images[0]?.url : null,
        metaKeywords,
        metaDescription,
        // createdBy: 1, // Hardcord for now
        // updatedBy: 1, // Hardcord for now
      };
      const product = await Products.update(productData, {
        where: { id },
        transaction: t,
      });

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

      await ProductsImages.destroy({
        where: { productId: id },
        transaction: t,
      });

      if (images?.length > 1) {
        const imgs = images.map((i: any) => ({
          image: i.url,
          productId: id,
        }));

        await ProductsImages.bulkCreate(imgs.shift(), {
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
        const {
          sku,
          price,
          shortDescription,
          supplierPrice,
          images,
          barcodes,
          attributes,
        } = variation;

        promises.push(
          new Promise(async (resolve, reject) => {
            const pvDate = {
              productId: id,
              sku,
              price,
              supplierPrice,
              mainImage: images ? images[0]?.url : null,
              mainBarcode: barcodes ? barcodes[0]?.barcodes : sku,
              shortDescription,
              // createdBy: 1,
              // updatedBy: 1,
            };
            try {
              const DV = await ProductVariations.create(pvDate);

              if (attributes?.length > 0) {
                const attr = attributes.map((i: any) => ({
                  attributeId: i.id,
                  alt: i.alt,
                  value: i.value,
                  productVariationId: DV.id,
                }));

                await ProductVariationAttributeValues.bulkCreate(attr, {
                  transaction: t,
                });
              }

              if (images?.length > 1) {
                const imgs = images.map((i: any) => ({
                  image: i.url,
                  productVariationId: DV.id,
                }));

                await ProductVariationsImages.bulkCreate(imgs.shift(), {
                  fields: ["productVariationId", "image"],
                  transaction: t,
                });
              }

              if (barcodes?.length > 1) {
                const bars = barcodes.map((i: any) => ({
                  barcode: i.barcode,
                  productVariationId: DV.id,
                  // createdBy: 1,
                  // updatedBy: 1,
                }));

                await ProductVariationsBarcodes.bulkCreate(bars.shift(), {
                  transaction: t,
                });
              }
            } catch (error) {
              reject(error);
              return;
            }

            resolve();
          })
        );
      }

      const vs = await Promise.all(promises);
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
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  return await Products.update(
    { active: sequelize.literal("NOT active") },
    { where: { id: id } }
  )
    .then((data) => {
      return res.json({ success: true, data });
    })
    .catch(next);
};

export const toggleVariationActiveStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { vid, pid } = req.params;

  return await ProductVariations.update(
    { active: sequelize.literal("NOT active") },
    { where: { id: vid, productId: pid } }
  )
    .then((data) => {
      return res.json({ success: true, data });
    })
    .catch(next);
};

export const getVaraitions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { Pid } = req.params;

  const result = await ProductVariations.findAll({
    where: { productId: Pid },
    attributes: [
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
  });

  return res.json({
    data: result,
  });
};

export const searchVariations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, pageSize, outletId }: any = req.query;

  return await ProductVariations.findAll({
    attributes: [
      "id",
      "sku",
      "supplierPrice",
      [
        sequelize.fn(
          "product_variation_name",
          sequelize.col("ProductVariations.id")
        ),
        "name",
      ],
    ],
    include: [
      { required: true, model: Products, attributes: [] },
      {
        model: Stocks,
        required: false,
        where: outletId ? { outletId } : {},
        attributes: ["id", "availableQuantity"],
      },
    ],
    limit: parseInt(pageSize || "20"),
    where: {
      [Op.or]: [
        {
          "$product.name$": {
            [Op.like]: `${name}%`,
          },
        },
        {
          sku: {
            [Op.like]: `${name}%`,
          },
        },
      ],
    },
    subQuery: false,
  })
    .then((data) => {
      const result = data.map((v) => ({
        ...v.get(),
        availableQuantity: v.stocks.reduce(
          (result, current) => result + current.availableQuantity,
          0
        ),
      }));

      return res.json({
        data: result.map((v) => {
          delete v.stocks;
          return v;
        }),
      });
    })
    .catch(next);
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
        required: true,
        model: ProductVariations.scope("websiteListing"),
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
      {
        model: Brands.scope("website"),
        required: true,
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
      {
        model: Brands.scope("website"),
        required: true,
      },
    ],
    limit: 10,
  });

  const topRated = Products.scope("websiteListing").findAll({
    include: [
      {
        required: true,
        model: ProductVariations.scope("websiteListing"),
        include: [{ model: Attributes }, { model: ProductVariationsImages }],
      },
      {
        model: Brands.scope("website"),
        required: true,
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
  search?: number;
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

  const data = await Products.scope("websiteListing").findAndCountAll({
    include: [
      {
        model: Categories.scope("website"),
        required: true,
        where: params.subSubcategorySlug
          ? { slug: params.subSubcategorySlug }
          : {},
        include: [
          {
            model: Categories.scope("website"),
            required: true,
            where: params.subCategorySlug
              ? { slug: params.subCategorySlug }
              : {},
            as: "parent",
            include: [
              {
                model: Categories.scope("website"),
                required: true,
                as: "parent",
                where: params.categorySlug ? { slug: params.categorySlug } : {},
              },
            ],
          },
        ],
      },
      {
        model: Brands.scope("website"),
        required: true,
        where: params.brandSlug ? { slug: params.brandSlug } : {},
      },
      {
        model: ProductVariations.scope("websiteListing"),
        required: true,
        where: pvWhere,
        include: [
          {
            model: ProductAttributes,
            attributes: ["id", "name", "type"],
            through: {
              attributes: ["id", "alt", "value"],
              as: "value",
            },
          },
        ],
      },
    ],
    limit: parseInt(params.pageSize || "100"),
    distinct: true,
    offset:
      parseInt(params.current || "1") * parseInt(params.pageSize || "100") -
      parseInt(params.pageSize || "20"),
    where: {
      ...pWhere,
    },
  });

  return res.json({
    current: parseInt(params.current || "1"),
    data: data.rows,
    pageSize: parseInt(params.pageSize || "20"),
    success: true,
    total: data.count,
  });
};

export const getSimilarProducts = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const slug = req.params.slug;

  const product = await Products.findOne({
    attributes: ["id", "categoryId"],
    where: { slug },
    include: [
      {
        model: Categories.scope("website"),
        required: true,
        include: [
          {
            model: Categories.scope("website"),
            required: true,
            as: "parent",
            include: [
              {
                model: Categories.scope("website"),
                required: true,
                as: "parent",
              },
            ],
          },
        ],
      },
    ],
  });

  const data = await Products.scope("websiteListing").findAll({
    include: [
      {
        model: Categories.scope("website"),
        required: true,
        include: [
          {
            model: Categories.scope("website"),
            required: true,
            as: "parent",
            include: [
              {
                model: Categories.scope("website"),
                required: true,
                as: "parent",
                where: { id: product?.category.parent.parent.id },
              },
            ],
          },
        ],
      },
      {
        model: Brands.scope("website"),
        required: true,
      },
      {
        model: ProductVariations.scope("websiteListing"),
        required: true,
        include: [
          {
            model: Attributes,
            attributes: ["id", "name", "type"],
            through: {
              attributes: ["id", "alt", "value"],
              as: "value",
            },
          },
        ],
      },
    ],
    limit: 3,
    order: myconnect.random(),
  });

  return res.json({
    data,
  });
};

export const getWebsiteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { slug } = req.params;

  const result = await Products.findOne({
    attributes: [
      "id",
      "name",
      "slug",
      "mainImage",
      "productCode",
      "description",
      "additionalInformation",
      "rating",
      "commentsCount",
      "metaTitle",
      "metaKeywords",
      "metaDescription",
    ],
    include: [
      // { model: ProductsImages },
      { model: Attributes, attributes: ["id", "name", "type"] },
      {
        model: Brands,
        where: { active: true },
        attributes: ["id", "slug", "name", "logo", "image"],
      },
      {
        model: Categories,
        where: { active: true },
        attributes: ["id", "slug", "name", "image"],
      },
      {
        model: ProductVariations,
        where: { active: true },
        attributes: [
          "id",
          "mainImage",
          "mainBarcode",
          "slug",
          "shortDescription",
          ["virtualQuantity","availableQuantity"],
          "sku",
          "price",
          "discountPrice",
          "discountType",
          "discountReason",
          "discountPercentage",
          "discountStartTime",
          "discountEndTime",
          "bestSeller",
          "preOrder",
          "topRated",
        ],
        include: [
          {
            model: Attributes,
            // where: { active: true },
            attributes: ["id", "name", "type"],
            through: {
              attributes: ["id", "alt", "value"],
              as: "value",
            },
          },
          { model: ProductVariationsImages },
          // {
          //   model: Stocks,
          //   attributes: ["id", "availableQuantity"],
          // },
        ],
      },
    ],
    where: { slug },
  });
  
  // .then((data) => {
  //   return {
  //     ...data?.get(),
  //     variations: data?.variations?.map((vs) => {
  //       let sum = 0;
  //       vs?.stocks?.forEach((item) => (sum = sum + item.availableQuantity));
  //       delete vs.get()["stocks"];
  //       return {
  //         ...vs.get(),
  //         images: vs.images?.map((item) => item.image),
  //         availableQuantity: sum ? sum : 0,
  //       };
  //     }),
  //   };
  // });

  return res.json({
    data: result,
  });
};

export const getStock = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { slugs }: any = req.query;

  const ArrayOfSlug = slugs.split(",");
  if (ArrayOfSlug.length < 0)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Sorry Invalid Parameters" });

  const result = await ProductVariations.findAll({
    attributes: [
      "id",
      "sku",
      ["virtualQuantity", "availableQuantity"],
      // [
      //   sequelize.fn("SUM", sequelize.col("stocks.availableQuantity")),
      //   "availableQuantity",
      // ],
    ],
    // include: [
    //   {
    //     model: Stocks,

    //     // where: outletId ? { outletId } : {},
    //     attributes: [],
    //   },
    // ],
    where: {
      slug: ArrayOfSlug,
    },
    subQuery: false,
    // group: "id",
  }).then((variations) => variations.map((v) => v.toJSON()));

  return res.json({
    data: result,
  });
};
