"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

   const users = [];
   for (let i = 1; i < 10; i++) {
     users.push({
       id: i,
       brandId: i,
       supplierId:i,
       createdAt: new Date(),
       updatedAt: new Date(),
     });
   }

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
