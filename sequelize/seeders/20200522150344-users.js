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
       countryId: 1,
       outletId:1,
       supplierId:1,
       firstName: `foobar${i}`,
       lastName: `foobar${i}`,
       designation:`foobar${i}`,
       slug: null,
       image:"www.myimage.mu=ak",
       email: "emial@gmail.com",
       password: `foobar${i}`,
       phone: "03103983048",
       gender:"male",
       active: true,
       DOB:new Date(),
       createdBy:1,
       updatedBy:1,
       deletedBy:null,
       phoneVerifyAt:new Date(),
       emailVerifyAt:new Date(),
       createdAt: new Date(),
       updatedAt: new Date(),
     });
   }
   return queryInterface.bulkInsert("users", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkDelete("users", null, {});
    
  }
};
