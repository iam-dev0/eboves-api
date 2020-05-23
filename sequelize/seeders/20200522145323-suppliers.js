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
       id:i,
       countryId:1,
       companyName:`foobar${i}`,
       slug:null,
       code:null,
       description:`foobar${i}`,
       website:"www.google.com",
       email:"emial@gmail.com",
       phone:"03103983048",
       warehouseAddress:`foobar${i}`,
       warehouseCityId:1,
       commissionPercentage:20,
       local:true,
       active:true,
       createdAt:new Date(),
       updatedAt:new Date(),
     });
   }
   return queryInterface.bulkInsert("suppliers", users);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
*/
      Example:
      return queryInterface.bulkDelete("suppliers", null, {});
    
  }
};
