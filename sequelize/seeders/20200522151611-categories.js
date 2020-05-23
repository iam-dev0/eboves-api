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
        name: `foobar${i}`,
        slug: null,
        image: null,
        displayOrder: null,
        storyText: null,
        storyTextColor: null,
        storyCover: null,
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
    return queryInterface.bulkInsert("categories", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("categories", null, {});
  },
};
