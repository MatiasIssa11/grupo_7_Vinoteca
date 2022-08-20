'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("cartProducts", {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idCart: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        idProducts: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        priceProducts: {
          type: Sequelize.INTEGER,
          allowNull: false,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("cartProducts");
  }
};
