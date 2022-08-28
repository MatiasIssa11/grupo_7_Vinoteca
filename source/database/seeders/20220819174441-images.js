"use strict";

const product = require("../../models/products.model");
const user = require("../../models/users.model");

module.exports = {
  async up(queryInterface, Sequelize) {
    let productImages = product.index().map((product) => {
      return product.image;
    }); //Levantamos todas las imagenes de los productos
    let userAvatars = user.index().map((user) => {
      return user.avatar;
    }); //Levantamos todas las imagenes de los usuarios

    let images = productImages.concat(userAvatars); //Las juntamos en un solo array y creamos el object

    images = images.map((i) => {
      return Object({ path: i });
    }); //Creamos el objeto para el images

    await queryInterface.bulkInsert("images", images, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("images", null, {});
  },
};
