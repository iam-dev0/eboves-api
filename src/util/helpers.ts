import ProductVariations from "../models/ProductVariations";
import ProductVariationsImages from "../models/ProductVariationImages";
import ProductVariationsBarcodes from "../models/ProductVariationBarcodes";
import ProductVariationAttributeValues from "../models/ProductVariationAttributeValues";

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
