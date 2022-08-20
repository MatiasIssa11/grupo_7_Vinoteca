'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.createTable("nameProducts", {
        id: {
          type: Sequelize.SMALLINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nameProduct: {
          type: Sequelize.VARCHAR,
          allowNull: false,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("nameProducts");
  }
};
