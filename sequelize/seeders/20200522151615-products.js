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
        categoryId: null,
        brandId:null,
        supplierId:null,
        attributeId:null,
        sku:null,
        name: `foobar${i}`,
        description: `foobar${i}`,
        descriptionImage:"someimage here",
        howToUse:"instruction how to use",
        productCode:null,
        slug: null,
        price:100,
        commentsCount:7,
        rating:4,
        metaTitle: null,
        metaKeywords: null,
        metaDescription: null,
        active: true,
        createdBy: 1,
        updatedBy: 1,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("products", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("products", null, {});
  },
};
