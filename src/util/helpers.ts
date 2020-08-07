import ProductVariations from "../models/ProductVariations";
import ProductVariationsImages from "../models/ProductVariationImages";
import ProductVariationsBarcodes from "../models/ProductVariationBarcodes";
import ProductVariationAttributeValues from "../models/ProductVariationAttributeValues";
import { QureyParams } from "#root/controllers/controllerProducts";
import { Op } from "sequelize";

export const prepareWhere = (params: QureyParams): unknown => {
  let pWhere = {};
  let pvWhere = {};
  if (params.bestSeller)
    pWhere = {
      ...pWhere,
      bestSeller: params.bestSeller.toLowerCase() === "true",
    };
  if (params.trending)
    pWhere = { ...pWhere, trending: params.trending.toLowerCase() === "true" };
  if (params.topRated)
    pWhere = { ...pWhere, topRated: params.topRated.toLowerCase() === "true" };
  if (params.featured)
    pWhere = { ...pWhere, featured: params.featured.toLowerCase() === "true" };
  // if (params.pvTrending)
  //   where = {
  //     ...where,
  //     "$variations.trending$": params.pvTrending.toLowerCase() === "true",
  //   };
  // if (params.pvTopRated)
  //   where = {
  //     ...where,
  //     "$variations.topRated$": params.pvTopRated.toLowerCase() === "true",
  //   };
  // if (params.pvFeatured)
  //   where = {
  //     ...where,
  //     "$variations.featured$": params.pvFeatured.toLowerCase() === "true",
  //   };
  if (params.pricelte || params.pricegte)
  pvWhere = {
      ...pvWhere,
      "$variations.price$": {
        [Op.gte]: params.pricegte,
        [Op.lte]: params.pricelte,
      },
    };
  return { pWhere, pvWhere };
};

export const CreateVariationHelper = (variation: any, productId, t) => {
  const {
    sku,
    price,
    shortDescription,
    images,
    barcodes,
    attributes,
  } = variation;
  return new Promise(async (resolve, reject) => {
    try {
      const DV = await ProductVariations.create({
        productId,
        sku,
        price,
        shortDescription,
        createdBy: 1,
        updatedBy: 1,
      });

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

      if (images?.length > 0) {
        const imgs = images.map((i: any) => ({
          image: i.url,
          productVariationId: DV.id,
        }));

        await ProductVariationsImages.bulkCreate(imgs, {
          fields: ["productVariationId", "image"],
          transaction: t,
        });
      }

      if (barcodes?.length > 0) {
        const bars = barcodes.map((i: any) => ({
          barcode: i.barcode,
          supplierPrice: i.supplierPrice,
          productVariationId: DV.id,
          createdBy: 1,
          updatedBy: 1,
        }));

        await ProductVariationsBarcodes.bulkCreate(bars, {
          transaction: t,
        });
      }
    } catch (error) {
      reject(error);
      return;
    }

    resolve();
  });
};
