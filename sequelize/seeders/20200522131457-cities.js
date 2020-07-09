/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const  { stringGenerator }= require("../../dist/util/index");

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
      "select * from states;"
    );
    const cities = [];
    states[0].map(({ id }) => {
      [...Array(Math.floor(Math.random() * 10)+1)].map(()=>
        cities.push({
          stateId: id,
          name: stringGenerator(Math.floor(Math.random() * 2) + 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      );
    });
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
