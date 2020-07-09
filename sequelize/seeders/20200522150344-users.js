/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { stringGenerator,getrandomBoolean } = require("../../dist/util/index");
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

    const users = [];
    [...Array(Math.floor(Math.random() * 10) + 5)].map(() =>
      users.push({
        outletId:  country[0][0].outletId,
        supplierId: null,
        firstName: stringGenerator(Math.floor(Math.random() * 2) + 1),
        lastName: stringGenerator(Math.floor(Math.random() * 2) + 1),
        designation: stringGenerator(Math.floor(Math.random() * 2) + 1),
        slug: stringGenerator(Math.floor(Math.random() * 2) + 1),
        image: "https://via.placeholder.com/150",
        email: "emial@gmail.com",
        password: stringGenerator(Math.floor(Math.random() * 2) + 1, true),
        phone: "03103983048",
        gender: ["male", "female"][Math.floor(Math.random * 1)],
        active: getrandomBoolean(.1),
        DOB: new Date(),
        createdBy: null,
        updatedBy: null,
        deletedBy: null,
        phoneVerifyAt: new Date(),
        emailVerifyAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
    return queryInterface.bulkInsert("users", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("users", null, {});
  },
};
