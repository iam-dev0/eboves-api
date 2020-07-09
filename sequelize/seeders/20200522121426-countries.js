/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const  { stringGenerator }= require("../../dist/util/index");
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
        name: stringGenerator(Math.floor(Math.random()*3)+1),
        iso: stringGenerator(Math.floor(Math.random()*2)+1),
        flag:"https://via.placeholder.com/150x200",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("countries", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    Example: return queryInterface.bulkDelete("countries", null, {});
  },
};
