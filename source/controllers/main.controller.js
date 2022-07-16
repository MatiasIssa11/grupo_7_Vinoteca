const { index } = require("../models/products.model");

module.exports = {
  home: (req, res) => {
    let product = index();
    const comparePrice = (a, b) => a.price - b.price;
    let sales = product.sort(comparePrice).filter((r, i) => i <= 3);
    let releases = product.reverse().filter((r, i) => i <= 3);

    return res.render("index", {
      title: "Cava Wines-Home",
      styles: ["home-mobile", "home-tablet", "home-desktop"],
      sales: sales,
      releases: releases,
    });
  },

  ageCheck: (req, res) => {
    return res.render("agecheck", {
      title: "Cava Wines-Verificación de edad",
      styles: ["age-mobile", "age-tablet", "age-desktop"],
    });
  },

  contact: (req, res) => {
    return res.render("contact", {
      title: "Cava Wines-Contacto",
      styles: ["contact-mobile", "contact-tablet", "contact-desktop"],
    });
  },
};
