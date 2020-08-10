/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
  previousRandomDate,
  randomArrayElement,
  getrandomBoolean,
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


  const pvs = await queryInterface.sequelize.query(
    "select * from product_Variations"
  );
  const outlets = await queryInterface.sequelize.query(
    "select * from outlets"
  );
  const suppliers = await queryInterface.sequelize.query(
    "select * from suppliers"
  );
  const users = await queryInterface.sequelize.query("select * from users;");

  const data = [];
  pvs[0].map((pv) =>
    [...Array(Math.floor(Math.random() * 2))].map(() =>
    data.push({
        outletId: randomArrayElement(outlets[0]).id,
        productVariationId: pv.id,
        supplierId: randomArrayElement(suppliers[0]).id,
        supplierPrice: pv.supplierPrice,
        availableQuantity:Math.floor(Math.random()*10),
        active:true,
        createdBy: randomArrayElement(users[0]).id,
        updatedBy: randomArrayElement(users[0]).id,
        deletedBy: null,
        createdAt: previousRandomDate(),
        updatedAt: new Date(),
      })
    )
  );
    return queryInterface.bulkInsert("stocks", data);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("stocks", null, {});
  },
};
