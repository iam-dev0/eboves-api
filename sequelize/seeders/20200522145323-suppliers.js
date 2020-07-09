/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const  { stringGenerator,getrandomBoolean }= require("../../dist/util/index");

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
  //  console.log(country);
   const suppliers = [];
   if(country[0].length>0)
   [...Array(Math.floor(Math.random() * 10)+5)].map(()=>
    suppliers.push({
       cityId:country[0][0].cityId,
       companyName:stringGenerator(Math.floor(Math.random() * 2) + 1),
       slug:stringGenerator(Math.floor(Math.random() * 2) + 1),
       code:stringGenerator(1,true),
       description:stringGenerator(Math.floor(Math.random() * 20) + 4),
       website:"www.google.com",
       email:"emial@gmail.com",
       phone:"03103983048",
       warehouseAddress:stringGenerator(Math.floor(Math.random() * 10) + 4),
       warehouseCityId:country[0][0].cityId,
       commissionPercentage:Math.floor(Math.random() * 20),
       local:true,
       active:getrandomBoolean(.1),
       createdAt:new Date(),
       updatedAt:new Date(),
     })
   );
   return queryInterface.bulkInsert("suppliers", suppliers);
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
