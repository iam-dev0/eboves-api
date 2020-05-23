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
        id: i,
        cityId: 1,
        outletName: `foobar${i}`,
        name: `foobar${i}`,
        slug: null,
        address: `foobar${i}`,
        email: "emial@gmail.com",
        phone: "03103983048",
        online: true,
        default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
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
