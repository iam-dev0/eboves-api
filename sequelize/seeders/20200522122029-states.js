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
    const states = [];
    for (let i = 1; i < 10; i++) {
      for (let j = 1; j < 10; j++) {
        states.push({
          id:i+(j*10-10),
          countryId: i,
          name: `foobar${j}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    return queryInterface.bulkInsert("states", states);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  */
    Example: return queryInterface.bulkDelete("states", null, {});
  },
};
