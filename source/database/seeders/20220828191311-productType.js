"use strict";

const { index } = requires("../../models/products.model.js");

module.exports = {
  async up(queryInterface, Sequelize) {
    let productType = index().map((t) => {
      return Object({ type: t.type });
    });
    await queryInterface.bulkInsert("productType", productType, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("productType", null, {});
  },
};
