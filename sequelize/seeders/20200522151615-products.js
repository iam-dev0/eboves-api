/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
  randomArrayElement,
  getrandomBoolean,
} = require("../../dist/util/index");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const brands = await queryInterface.sequelize.query("select * from brands");
    const suppliers = await queryInterface.sequelize.query(
      "select * from suppliers"
    );
    const categoris = await queryInterface.sequelize.query(
      "select id from categories where categoryId in (select id from categories where categoryId in (select id from categories where categoryId is null));"
    );

    const users = await queryInterface.sequelize.query("select * from users;");

    const products = [];
    [...Array(Math.floor(Math.random() * 500) + 10)].map(() =>
      products.push({
        categoryId: randomArrayElement(categoris[0]).id,
        brandId: randomArrayElement(brands[0]).id,
        supplierId: randomArrayElement(suppliers[0]).id,
        mainImage: "https://via.placeholder.com/720x720",
        productType: randomArrayElement(["eboves", "supplier"]),
        sku: stringGenerator(Math.floor(Math.random() * 10) + 1, true).replace(
          /\s/g,
          "-"
        ),
        name: stringGenerator(Math.floor(Math.random() * 10) + 1),
        description: stringGenerator(Math.floor(Math.random() * 100) + 1),
        descriptionImage: "https://via.placeholder.com/1080x720",
        howToUse: stringGenerator(Math.floor(Math.random() * 100) + 1),
        productCode: stringGenerator(Math.floor(Math.random() * 10) + 1),
        slug: stringGenerator(Math.floor(Math.random() * 10) + 1).replace(
          /\s/g,
          "-"
        ),
        price: Math.floor(Math.random() * 10000) + 100,
        commentsCount: Math.floor(Math.random() * 100) + 1,
        rating: Math.floor(Math.random() * 5),
        metaTitle: stringGenerator(Math.floor(Math.random() * 10) + 1),
        metaKeywords: stringGenerator(Math.floor(Math.random() * 10) + 1),
        metaDescription: stringGenerator(Math.floor(Math.random() * 10) + 1),
        active: getrandomBoolean(0.1),
        bestSeller: getrandomBoolean(0.7),
        topRated: getrandomBoolean(0.8),
        featured: getrandomBoolean(0.8),
        createdBy: randomArrayElement(users[0]).id,
        updatedBy: randomArrayElement(users[0]).id,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    return queryInterface.bulkInsert("products", products);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("products", null, {});
  },
};
