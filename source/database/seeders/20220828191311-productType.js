"use strict";

const { index } = require("../../models/products.model.js");

module.exports = {
  async up(queryInterface, Sequelize) {
    let productType = index().map((t) => {
      return Object({ type: t.type });
    });
    await queryInterface.bulkInsert("productTypes", productType, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("productTypes", null, {});
  },
};
