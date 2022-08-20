'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("productType", {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("productType");
  }
};
