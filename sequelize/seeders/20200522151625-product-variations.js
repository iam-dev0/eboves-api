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
        productId: i,
        sku:null,
        slug:null,
        // name: `foobar${i}`,
        shortDescription: `foobar${i}`,
        virtualQuantity:20,
        price:200,
        discountPercentage:0,
        discountPrice:0,
        discountStartTime:null,
        discountEndTime:null,
        trending:false,
        continue:true,
        preOrder:false,
        bestSeller:false,
        active: true,
        createdBy: 1,
        updatedBy: 1,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("product_variations", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("product_variations", null, {});
  },
};
