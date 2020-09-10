/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const {
  stringGenerator,
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

    const banners = [];
    for (let i = 1; i < Math.floor(Math.random() * 20) + 5; i++) {
      banners.push({
        title: stringGenerator(1),
        type: "slider",
        active: getrandomBoolean(0.2),
        href: "https://github.com/",
        image: "https://via.placeholder.com/1920x500",
      });
    }
    banners.push({
      title: stringGenerator(1),
      type: "featured",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/470x510",
    });
    banners.push({
      title: stringGenerator(1),
      type: "featured",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/290x510",
    });
    banners.push({
      title: stringGenerator(1),
      type: "featured",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/370x245",
    });
    banners.push({
      title: stringGenerator(1),
      type: "featured",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/370x245",
    });
    banners.push({
      title: stringGenerator(1),
      type: "dealOfTheDay",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/440x460",
    });
    banners.push({
      title: stringGenerator(1),
      type: "dealOfTheDay",
      active: true,
      href: "https://github.com/",
      image: "https://via.placeholder.com/280x500",
    });
    return queryInterface.bulkInsert("banners", banners);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
    return queryInterface.bulkDelete("banners", null, {});
  },
};
