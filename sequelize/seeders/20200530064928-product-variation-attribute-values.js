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
    "select * from product_attribute"
  );
  const productVariations = await queryInterface.sequelize.query(
    "select * from product_variations"
  );

    const values = [];
    for (let i = 1; i < Math.floor(Math.random() * 20) + 5; i++) {
      values.push({
        title: stringGenerator(1),
        type: randomArrayElement(["slider", "banner1", "banner2", "banner3"]),
        active: getrandomBoolean(0.2),
        href: "https://github.com/",
        image: "https://via.placeholder.com/720x720",
      });
    }
    return queryInterface.bulkInsert("product_variation_attribute_values", values);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_variation_attribute_values", null, {});
  },
};
