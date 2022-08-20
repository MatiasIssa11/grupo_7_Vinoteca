'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.VARCHAR,
          allowNull: false,
        },
        apellido: {
          type: Sequelize.VARCHAR,
          allowNull: false,
        },
        email: {
          type: Sequelize.VARCHAR,
          allowNull: false,
          unique: true,
        },
        discountPrice: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        avatar: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        password: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
