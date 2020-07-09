/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { stringGenerator,randomArrayElement } = require("../../dist/util/index");

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

   const brands = await queryInterface.sequelize.query(
    "select * from brands"
  );
  const suppliers = await queryInterface.sequelize.query(
    "select * from suppliers"
  );
  
   const users = [];
   brands[0].map((brand)=>
     users.push({
       brandId: brand.id,
       supplierId:randomArrayElement(suppliers[0]).id,
       createdAt: new Date(),
       updatedAt: new Date(),
     })
   );

   return queryInterface.bulkInsert("brand_supplier", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */  Example:
      return queryInterface.bulkDelete("brand_supplier", null, {});
  
  }
};
