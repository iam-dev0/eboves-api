import express from "express";
import readXlsxFile from "read-excel-file/node";
import Categories from "../models/Categories";
import Brands from "../models/Brands";
import myconnect from "../db/db";
import Products from "../models/Products";
import ProductVariations from "../models/ProductVariations";
import ProductVariationsImages from "../models/ProductVariationImages";
import Suppliers from "../models/Supplier";
import Attributes from "../models/Attributes";
import ProductAttributes from "../models/ProductAttributes";
import ProductVariationAttributeValues from "../models/ProductVariationAttributeValues";

const baseURLforImags =
  "https://eboves.oss-ap-south-1.aliyuncs.com/images/products/";
// const baseURLforImags='https://assets.eboves.com/images/products/'

const app = express();

const categoryStructure = (rows) => {
  const categories: any = [];
  rows.forEach((row) => {
    const object = {
      slug:
        row[0].split(" ").join("-").toLowerCase() +
        "_" +
        Math.floor(Math.random() * 100000),
      name: row[0].charAt(0).toUpperCase() + row[0].slice(1),
      childrens: [
        {
          slug:
            row[1].split(" ").join("-").toLowerCase() +
            "_" +
            Math.floor(Math.random() * 100000),
          name: row[1].charAt(0).toUpperCase() + row[1].slice(1),
          childrens: [
            {
              slug:
                row[2].split(" ").join("-").toLowerCase() +
                "_" +
                Math.floor(Math.random() * 100000),
              name: row[2].charAt(0).toUpperCase() + row[2].slice(1),
            },
          ],
        },
      ],
    };
    if (!categories.length) {
      return categories.push(object);
    }

    const index = categories.findIndex(
      (item) => item.name.toLowerCase() === row[0].toLowerCase()
    );
    if (index > -1) {
      const subIndex = categories[index].childrens.findIndex(
        (item) => item.name.toLowerCase() === row[1].toLowerCase()
      );

      if (subIndex > -1) {
        const subsubIndex = categories[index].childrens[
          subIndex
        ].childrens.findIndex(
          (item) => item.name.toLowerCase() === row[2].toLowerCase()
        );
        if (subsubIndex === -1)
          categories[index].childrens[subIndex].childrens.push(
            object.childrens[0].childrens[0]
          );
      } else {
        categories[index].childrens.push(object.childrens[0]);
      }
    } else {
      categories.push(object);
    }
  });
  return categories;
};

const attributeStructure = (rows) => {
  const attribute: any = [];
  rows.forEach((row) => {
    const object = {
      name: row[0],
      type: row[1],
      unit: row[2],
    };
    if (!attribute.length) attribute.push(object);

    const index = attribute.findIndex(
      (item) => item.name.toLowerCase() === object.name.toLowerCase()
    );
    if (index === -1) attribute.push(object);
  });
  return attribute;
};

app.get("/categories", async (req, res) => {
  const rows = await readXlsxFile("./src/Scraper/Category.xlsx");
  // skip header

  rows.shift();
  const categories = categoryStructure(rows);

  const cats = await Categories.bulkCreate(categories, {
    include: [
      {
        model: Categories,
        as: "childrens",
        include: [{ model: Categories, as: "childrens" }],
      },
    ],
  });

  return res.status(200).json({ cats });
});

app.get("/products", async (req, res) => {
  const rows = await readXlsxFile("./src/Scraper/Sabmilygaa.com.xlsx");
  // skip header
  rows.shift();
  const products: any[] = [];
  let suppliers: any[] = [];
  let brands: any[] = [];
  let categories: any[] = [];
  let attributes: any[] = [];
  try {
    const result = await myconnect.transaction(async (t) => {
      rows.forEach((row) => {
        if (!row[2]) return;

        const object = {
          supplier: row[4],
          brand: row[5],
          mainCategry: row[6],
          category: row[7],
          part: row[8],
        };
        brands.push(object.brand);
        suppliers.push(object.supplier);
        categories.push([row[6], row[7], row[8]]);
        if (row[17] && row[17].length > 0)
          attributes.push([row[17], row[18], row[19], row[20], row[21]]);
        if (row[17 + 5] && row[17 + 5].length > 0)
          attributes.push([
            row[17 + 5],
            row[18 + 5],
            row[19 + 5],
            row[20 + 5],
            row[21 + 5],
          ]);
      });

      suppliers = [...new Set(suppliers)];
      brands = [...new Set(brands)];
      categories = [...new Set(categories)];
      categories = categoryStructure(categories);
      attributes = attributeStructure(attributes);

      const supplierPromises: Promise<Suppliers>[] = [];
      for (const supplier of suppliers) {
        supplierPromises.push(
          new Promise(async (resolve, reject) => {
            return await Suppliers.findOne({
              where: { companyName: supplier },
              transaction: t,
            })
              .then((data) => {
                if (data) return data;
                return Suppliers.create(
                  {
                    companyName: supplier,
                    slug: supplier.replace(/ /g, "-").toLowerCase(),
                  },
                  { transaction: t }
                );
              })
              .then((data) => resolve(data))
              .catch((err) => reject(err));
          })
        );
      }
      const supplierData = await Promise.all(supplierPromises);

      const brandPromises: Promise<Brands>[] = [];
      for (const brand of brands) {
        brandPromises.push(
          new Promise(async (resolve, reject) => {
            return await Brands.findOne({
              where: { name: brand },
              transaction: t,
            })
              .then((data) => {
                if (data) return data;
                return Brands.create(
                  { name: brand, slug: brand.replace(/ /g, "-").toLowerCase() },
                  { transaction: t }
                );
              })
              .then((data) => resolve(data))
              .catch((err) => reject(err));
          })
        );
      }
      const brandData = await Promise.all(brandPromises);

      const attributePromises: Promise<Attributes>[] = [];
      for (const attribute of attributes) {
        attributePromises.push(
          new Promise(async (resolve, reject) => {
            return await Attributes.findOne({
              where: attribute,
              transaction: t,
            })
              .then((data) => {
                if (data) return data;
                return Attributes.create(attribute, { transaction: t });
              })
              .then((data) => resolve(data))
              .catch((err) => reject(err));
          })
        );
      }
      const attributeData = await Promise.all(attributePromises);

      const Categorypromises: Promise<Categories>[] = [];
      for (const category of categories) {
        Categorypromises.push(
          new Promise(async (resolve, reject) => {
            try {
              const categorydata = await Categories.findOne({
                where: { name: category.name },
                transaction: t,
              }).then((data) => {
                if (data) return data;
                return Categories.create(
                  {
                    name: category.name,
                    slug: category.slug,
                  },
                  { transaction: t }
                );
              });
              const Categorypromises: Promise<Categories>[] = [];
              for (const subCategory of category.childrens) {
                Categorypromises.push(
                  new Promise(async (resolve, reject) => {
                    try {
                      const subcategorydata = await Categories.findOne({
                        where: {
                          name: subCategory.name,
                          categoryId: categorydata.id,
                        },
                        transaction: t,
                      }).then((data) => {
                        if (data) return data;
                        return Categories.create(
                          {
                            name: subCategory.name,
                            slug: subCategory.slug,
                            categoryId: categorydata.id,
                          },
                          { transaction: t }
                        );
                      });
                      const Categorypromises: Promise<Categories>[] = [];
                      for (const subSubcategory of subCategory.childrens) {
                        Categorypromises.push(
                          new Promise(async (resolve, reject) => {
                            try {
                              const partcategory = await Categories.findOne({
                                where: {
                                  name: subSubcategory.name,
                                  categoryId: subcategorydata.id,
                                },
                                transaction: t,
                              }).then((data) => {
                                if (data) return data;
                                return Categories.create(
                                  {
                                    name: subSubcategory.name,
                                    categoryId: subcategorydata.id,
                                    slug: subSubcategory.slug,
                                  },
                                  { transaction: t }
                                );
                              });
                              resolve(partcategory);
                            } catch (error) {
                              reject(error);
                              return;
                            }
                          })
                        );
                      }

                      const cts: any = await Promise.all(Categorypromises).then(
                        (data) => {
                          return { ...subcategorydata.get(), childrens: data };
                        }
                      );
                      resolve(cts);
                    } catch (error) {
                      reject(error);
                      return;
                    }
                  })
                );
              }

              const cts: any = await Promise.all(Categorypromises).then(
                (data) => {
                  return { ...categorydata.get(), childrens: data };
                }
              );
              resolve(cts);
            } catch (error) {
              reject(error);
              return;
            }
          })
        );
      }

      const categoryData = await Promise.all(Categorypromises);

      rows.forEach((row) => {
        if (!row[2]) return;

        let vairationImage = [];
        let firstImage: any = null;

        if (row[16].length > 0) {
          vairationImage = row[16]
            .split(",")
            .map((name) => `${baseURLforImags}${name}.jpg`);
          firstImage = vairationImage.shift();
        }

        const categoryId = categoryData
          .find((item) => item.name.toLowerCase() === row[6].toLowerCase())
          ?.childrens.find((item) => item.name.toLowerCase() === row[7].toLowerCase())
          ?.childrens.find((item) => item.name.toLowerCase() === row[8].toLowerCase())?.id;

        let attrs: any = [];
        if (row[17] && row[17].length > 0)
          attrs.push([row[17], row[18], row[19], row[20], row[21]]);
        if (row[17 + 5] && row[17 + 5].length > 0)
          attrs.push([
            row[17 + 5],
            row[18 + 5],
            row[19 + 5],
            row[20 + 5],
            row[21 + 5],
          ]);

        attrs = attrs.map((att) => {
          return {
            attributeId: attributeData.find(
              (item) => item.name.toLowerCase() === att[0].toLowerCase()
            ),
            value: att[4],
            alt: att[5],
          };
        });
        const object = {
          productId: row[0],
          productCode: row[1],
          name: row[2],
          slug: row[2].split(" ").join("-").toLowerCase() + "_" + row[11]+ "_"+ Math.floor(Math.random()*100000),
          productType: row[3],
          supplierId: supplierData.find((item) => item.companyName === row[4])
            ?.id,
          brandId: brandData.find((item) => item.name === row[5])?.id,
          categoryId,
          description: row[9],
          attributes: attrs.map((item) => ({ attributeId: item.attributeId })),
          variations: [
            {
              sku: row[11],
              slug: row[2].split(" ").join("-").toLowerCase() + "_" + row[11]+ Math.floor(Math.random()*100000),
              mainBarcode: row[11] ? row[11] : row[10],
              shortDescription: row[12],
              price: row[13],
              supplierPrice: row[14],
              virtualQuantity: row[15],
              mainImage: firstImage,
              images: vairationImage.map((img) => ({ image: img })),
              attributes: attrs,
            },
          ],
        };

        if (products.length === 0) {
          products.push(object);
          return;
        }
        const index = products.findIndex(
          (item) =>
            item.productId === object.productId && object.productId?.length > 0
        );
        if (index > -1) {
          products[index].variations.push(object.variations[0]);
        } else {
          products.push(object);
        }
      });

      const pds = await Products.bulkCreate(products, {
        transaction: t,
        include: [
          {
            model: ProductVariations,
            as: "variations",
            include: [
              { model: ProductVariationsImages, as: "images" },
              { model: Attributes, as: "attributes" },
            ],
          },
          {
            model: Attributes,
            as: "attributes",
          },
        ],
      });

      res.json({ result: pds });
      // throw Error("hello");
    });
  } catch (err) {
    console.error(err);
  }
});

export default app;
