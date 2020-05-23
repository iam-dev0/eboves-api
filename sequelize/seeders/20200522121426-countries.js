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
        id:i,
        name: `foobar${i}`,
        iso: `foobar${i}`,
        createdAt:new Date(),
        updatedAt:new Date(),
      });
    }
    return queryInterface.bulkInsert("countries", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
      Example:
      return queryInterface.bulkDelete("countries", null, {});
    
  },
};
