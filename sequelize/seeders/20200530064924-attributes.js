/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
  randomArrayElement,
  getrandomBoolean,
} = require("../../dist/util/index");
module.exports = {
  up:async (queryInterface, Sequelize) => {
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

    const attributes = [];
    for (let i = 1; i < 10; i++) {
      attributes.push({
        name: stringGenerator(1),
        type: randomArrayElement(["text","image","numeric"]),
        active: getrandomBoolean(0.2),
        unit:randomArrayElement([null,"lb","g","ml","mm"]),
        createdBy:  randomArrayElement(users[0]).id,
        updatedBy:  randomArrayElement(users[0]).id,
        deletedBy: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("attributes", attributes);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("attributes", null, {});
  },
};
