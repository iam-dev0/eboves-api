/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
  randomArrayElement,
  getrandomBoolean
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

    const users = await queryInterface.sequelize.query("select * from users;");
    const categories = [];
    [...Array(Math.floor(Math.random() * 5)+2)].map(() =>
      categories.push({
        categoryId: null,
        name: stringGenerator(Math.floor(Math.random() * 2) + 1),
        slug: stringGenerator(Math.floor(Math.random() * 2) + 1),
        image: null,
        displayOrder: null,
        storyText: stringGenerator(Math.floor(Math.random() * 10) + 1),
        storyTextColor: "#ffff",
        storyCover: "https://via.placeholder.com/1080x720",
        metaTitle: stringGenerator(Math.floor(Math.random() * 10) + 1),
        metaKeywords: stringGenerator(Math.floor(Math.random() * 10) + 1),
        metaDescription: stringGenerator(Math.floor(Math.random() * 10) + 1),
        active:getrandomBoolean(.1),
        createdBy: randomArrayElement(users[0]).id,
        updatedBy: randomArrayElement(users[0]).id,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    return queryInterface.bulkInsert("categories", categories);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("categories", null, {});
  },
};
