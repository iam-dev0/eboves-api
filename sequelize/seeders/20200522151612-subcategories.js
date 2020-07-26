/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { stringGenerator ,randomArrayElement,getrandomBoolean} = require("../../dist/util/index");

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

    const pc = await queryInterface.sequelize.query(
      "select * from categories where categoryId is null;"
    );

    const users = await queryInterface.sequelize.query("select * from users;");

    const categories = [];
    pc[0].map((categroy) =>
      [...Array(Math.floor(Math.random() * 10)+2)].map(() =>
      categories.push({
          categoryId: categroy.id,
          name: stringGenerator(Math.floor(Math.random() * 2) + 1),
          slug: stringGenerator(2, true).replace(/\s/g,"-"),
          image: null,
          displayOrder: null,
          storyText: stringGenerator(Math.floor(Math.random() * 10) + 1),
          storyTextColor: "#ffff",
          storyCover: "https://via.placeholder.com/1080x720",
          metaTitle: stringGenerator(Math.floor(Math.random() * 10) + 1),
          metaKeywords: stringGenerator(Math.floor(Math.random() * 10) + 1),
          metaDescription: stringGenerator(Math.floor(Math.random() * 10) + 1),
          active: getrandomBoolean(.1),
          createdBy: randomArrayElement(users[0]).id,
          updatedBy: randomArrayElement(users[0]).id,
          deletedBy: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      )
    );
    return queryInterface.bulkInsert("categories", categories);
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      const c = await queryInterface.sequelize.query(
        "select id from categories where categoryId in (select id from categories where categoryId is null);"
      );
  
      return queryInterface.bulkDelete("categories", {id:c[0].map(c=>c.id)}, {});
  },
};
