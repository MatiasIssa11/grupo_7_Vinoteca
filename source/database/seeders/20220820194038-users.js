"use strict";

const { index } = require("../../models/users.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    let users = index().map(
      (user, index) => Object({ ...user, avatar: index + 9 }) //Aranca desde 9 porque es el último valor que me dá el seeders de tabla de products
    );
    
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
