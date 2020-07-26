/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  randomArrayElement,
  uniqeString,
  previousRandomDate,
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
      "select * from product_variations"
    );

    const users = await queryInterface.sequelize.query("select * from users;");

    const vps = [];
    products[0].map((product) =>
      [...Array(Math.floor(Math.random() * 3) + 1)].map(() =>
        vps.push({
          productVariationId: product.id,
          barcode: uniqeString(),
          supplierPrice: Math.floor(Math.random() * 10000) + 100,
          createdBy: randomArrayElement(users[0]).id,
          updatedBy: randomArrayElement(users[0]).id,
          deletedBy: null,
          createdAt: previousRandomDate(),
          updatedAt: new Date(),
        })
      )
    );
    return queryInterface.bulkInsert("product_variation_barcodes", vps);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_variation_barcodes", null, {});
  },
};
