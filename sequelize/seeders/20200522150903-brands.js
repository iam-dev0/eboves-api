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
        countryId: 1,

        name: `foobar${i}`,
        slug: null,
        code: null,
        logo1: `foobar${i}`,
        logo2: `foobar${i}`,
        image: null,
        storyText: null,
        storyTextColor: null,
        storyCover: null,
        popularity: false,
        new: true,
        active: true,
        metaTitle: null,
        metaKeywords: null,
        metaDescription: null,
        createdBy:1,
        updatedBy:1,
        deletedBy:null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("brands", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("brands", null, {});
  },
};
