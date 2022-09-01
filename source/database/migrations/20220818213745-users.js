"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("users", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        apellido: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        fechaNacimiento: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        avatar: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "images",
            key: "id",
          },
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
