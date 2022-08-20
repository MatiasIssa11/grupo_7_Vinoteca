'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("cart", {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        idUser: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        envio: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        total: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("cart");
  }
};
