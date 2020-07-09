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
   const countries=await queryInterface.sequelize.query("select * from countries;");
    const states = [];
    countries[0].map(({id})=>{
      
      states.push({  
      countryId: id,
      name: stringGenerator(Math.floor(Math.random()*2)+1),
      createdAt: new Date(),
      updatedAt: new Date()});});
      
   
    return queryInterface.bulkInsert("states", states);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  */
    Example: return queryInterface.bulkDelete("states", null, {});
  },
};
