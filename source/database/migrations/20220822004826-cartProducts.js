"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("cartProducts", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idCart: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "carts",
            key: "id",
          },
        },
        idProducts: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
        },
        priceProducts: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "products",
            key: "id",
          },
        },
        cantidad: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cartProducts");
  },
};
