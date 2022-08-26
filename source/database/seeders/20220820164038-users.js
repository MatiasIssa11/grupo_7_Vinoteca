"use strict";

const { index } = require("../../models/users.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    let users = index();
    users = users.map((u) => (u.avatar = null));
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
