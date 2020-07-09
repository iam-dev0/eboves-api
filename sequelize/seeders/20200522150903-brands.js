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

    const country = await queryInterface.sequelize.query(
      `select countries.id as countryId ,states.id as stateId,cities.id as cityId , outlets.id as outletId from countries 
  inner join states on countries.id =states.countryId
  inner join cities on states.id =cities.stateId
  inner join outlets on outlets.cityId=cities.id
  limit 1 ;`
    );
    const users = await queryInterface.sequelize.query("select * from users;");

    const brands = [];
    [...Array(Math.floor(Math.random() * 100))].map(() =>
    brands.push({
        name: stringGenerator(Math.floor(Math.random() * 2) + 1),
        slug: stringGenerator(Math.floor(Math.random() * 2) + 1),
        logo1: "https://via.placeholder.com/150x200",
        logo2: "https://via.placeholder.com/150x200",
        image: "https://via.placeholder.com/1080x720",
        storyText: stringGenerator(Math.floor(Math.random() * 15) + 1),
        storyTextColor: ["#eeee", "#ffff"][Math.floor(Math.random * 1)],
        storyCover: "https://via.placeholder.com/1080x720",
        popularity: getrandomBoolean(.9),
        new: getrandomBoolean(.9),
        active: getrandomBoolean(.1),
        metaTitle: stringGenerator(Math.floor(Math.random() * 15) + 1),
        metaKeywords: stringGenerator(Math.floor(Math.random() * 15) + 1),
        metaDescription: stringGenerator(Math.floor(Math.random() * 15) + 1),
        createdBy: randomArrayElement(users[0]).id,
        updatedBy: randomArrayElement(users[0]).id,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    return queryInterface.bulkInsert("brands", brands);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("brands", null, {});
  },
};
