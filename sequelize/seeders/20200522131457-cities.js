/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { stringGenerator,randomArrayElement } = require("../../dist/util/index");

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

    const states = await queryInterface.sequelize.query(
      "select countries.id as countryId,states.id as stateId  from countries inner join  states on states.countryId=countries.id;"
    );
    const cities = [];

    [...Array(Math.floor(Math.random() * 200) + 1)].map(() =>
      cities.push({
        stateId: randomArrayElement(states[0]).stateId,
        countryId: randomArrayElement(states[0]).countryId,
        name: stringGenerator(Math.floor(Math.random() * 2) + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );

    return queryInterface.bulkInsert("cities", cities);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
*/
    Example: return queryInterface.bulkDelete("cities", null, {});
  },
};
