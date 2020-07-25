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
    const products = await queryInterface.sequelize.query(
      "select * from products"
    );

    const users = await queryInterface.sequelize.query("select * from users;");

    const vps = [];
    products[0].map((product) =>
      [...Array(Math.floor(Math.random() * 10)+1)].map(() =>
        vps.push({
          productId: product.id,
          sku:  stringGenerator(Math.floor(Math.random() * 10) + 1,true),
          slug: stringGenerator(Math.floor(Math.random() * 10) + 1,true).replace(/\s/g,"-"),
          shortDescription: stringGenerator(Math.floor(Math.random() * 50) + 1),
          virtualQuantity: Math.floor(Math.random() * 100) + 10,
          price: Math.floor(Math.random() * 10000) + 100,
          discountPercentage: Math.floor(Math.random() * 100) + 0,
          discountPrice: Math.floor(Math.random() * 10000) + 0,
          discountStartTime: new Date(),
          discountEndTime: new Date(),
          trending: getrandomBoolean(.9),
          bestSeller: getrandomBoolean(0.7),
          topRated: getrandomBoolean(0.8),
          featured: getrandomBoolean(0.8),
          preOrder:getrandomBoolean(.9),
          bestSeller: getrandomBoolean(.9),
          active: getrandomBoolean(.1),
          createdBy: randomArrayElement(users[0]).id,
          updatedBy: randomArrayElement(users[0]).id,
          deletedBy: null,
          deletedBy: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      )
    );
    return queryInterface.bulkInsert("product_variations", vps);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_variations", null, {});
  },
};
