const {index} = require('../models/products.model');

module.exports = {
  home: (req, res) => {
    let product = index()

    return res.render("index", {
      title: "Cava Wines-Home",
      styles: ["home-mobile", "home-tablet", "home-desktop"],
      product: product,
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
