"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("products", {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        brand: {
          type: Sequelize.SMALLINT,
          allowNull: false,
        },
        type: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        discountPrice: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        image: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        alcohol: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        acidez: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        azucar: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        vista: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        nariz: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        boca: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        otros: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
