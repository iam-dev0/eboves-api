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
      "select * from products;"
    );
    const attributes = await queryInterface.sequelize.query(
      "select * from attributes;"
    );

    const PT = [];
    [...Array(Math.floor(Math.random() * 60) + 2)].map(() =>
      PT.push({
        productId: randomArrayElement(products[0]).id,
        attributeId: randomArrayElement(attributes[0]).id,
      })
    );
    return queryInterface.bulkInsert("product_attribute", PT);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_attribute", null, {});
  },
};
