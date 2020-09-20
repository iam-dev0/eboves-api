/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
  randomArrayElement,
  getrandomBoolean,
  randomUser,
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

    const cities = await queryInterface.sequelize.query("select * from cities");
    const values = [];
    for (let i = 1; i < 5; i++) {
      const user=randomUser();
      values.push({
        firstName: user.name.split(" ")[0],
        lastName: user.name.split(" ")[1],
        address:  stringGenerator(3),
        cityId: randomArrayElement(cities[0]).id,
        email: user.email,
        phone: user.phone,
      });
    }
    return queryInterface.bulkInsert(
      "shipping_information",
      values
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete(
      "shipping_information",
      null,
      {}
    );
  },
};
