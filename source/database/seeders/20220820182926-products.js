"use strict";

const { index } = require("../../models/products.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    let products = index().map(
      (product, index) =>
        Object({ ...product, image: index + 1, type: index + 1, brand: 1 }) //Aranca desde 1 porque la diferencia entre id y la posicion
    );

    await queryInterface.bulkInsert("products", products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
