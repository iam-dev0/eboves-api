/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const  { stringGenerator ,getrandomBoolean}= require("../../dist/util/index");

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
    `select countries.id as countryId ,states.id as stateId,cities.id as cityId from countries 
    inner join states on countries.id =states.countryId
    inner join cities on states.id =cities.stateId
    limit 1 ;`
  );


    const users = [];
    [...Array(Math.floor(Math.random() * 10)+5)].map(()=>
      users.push({
        cityId: country[0][0].cityId,
        name: stringGenerator(Math.floor(Math.random() * 2) + 1),
        slug: stringGenerator(Math.floor(Math.random() * 2) + 1),
        address: stringGenerator(Math.floor(Math.random() * 5) + 2),
        online: Math.random()>=0.5,
        default: Math.random()>=0.9999,
        active:getrandomBoolean(.1),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );

    return queryInterface.bulkInsert("outlets", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("outlets", null, {});
  },
};
