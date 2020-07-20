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
      "select id from products"
    );

    const productsImages = [];
    [...Array(Math.floor(Math.random() * 600) + 1)].map(() =>
      productsImages.push({
        productId: randomArrayElement(products[0]).id,
        image: "https://via.placeholder.com/720x720",
      })
    );
    return queryInterface.bulkInsert("product_images", productsImages);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_images", null, {});
  },
};
