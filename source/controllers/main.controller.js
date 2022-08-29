const { product } = require("../database/models/index");
const { Op } = require("sequelize");

module.exports = {
  home: async (req, res) => {
    let sales = await product.findAll({
      include: { all: true }, //Relaciones
      where: { discountPrice: { [Op.ne]: null } }, //Filtrado de los precios que no son nulos
      order: [["discountPrice", "ASC"]], // Orden según precio de descuento más barato
      limit: 4, //Muestra solo los 4 primeros
    });

    let releases = await product.findAll({
      include: { all: true }, //Relaciones
      order: [["id", "DESC"]], //Muestra primero los ultimos subidos, considerados los más recientes
      limit: 4, //Muestra solo los 4 primeros
    });

    return res.render("index", {
      title: "Cava Wines-Home",
      styles: ["home-mobile", "home-tablet", "home-desktop"],
      sales: sales,
      releases: releases,
    });
  },

  ageCheck: async (req, res) => {
    return res.render("agecheck", {
      title: "Cava Wines-Verificación de edad",
      styles: ["age-mobile", "age-tablet", "age-desktop"],
    });
  },

  ageRedirect: async (req, res) => {
    req.session.ageCheck = true;
    return res.redirect("/");
  },

  contact: async (req, res) => {
    return res.render("contact", {
      title: "Cava Wines-Contacto",
      styles: ["contact-mobile", "contact-tablet", "contact-desktop"],
    });
  },
};
