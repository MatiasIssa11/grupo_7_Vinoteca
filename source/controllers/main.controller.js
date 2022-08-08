const { index } = require("../models/products.model");

module.exports = {
  home: (req, res) => {
    let product = index();
    const comparePrice = (a, b) => a.discountPrice - b.discountPrice;
    let sales = product
      .filter((p) => p.discountPrice) //Filtra que tengan precio de descuento
      .sort(comparePrice) //ordena por precio de descuento
      .filter((r, i) => i <= 3); //Muestra los 4 primeros productos, ordenados por el más barato
    let releases = product.reverse().filter((r, i) => i <= 3); //Muestra los 4 primeros productos, empezando por el último agregado

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

  ageRedirect: (req, res) => {
    req.session.ageCheck = true;
    return res.redirect("/");
  },

  contact: (req, res) => {
    return res.render("contact", {
      title: "Cava Wines-Contacto",
      styles: ["contact-mobile", "contact-tablet", "contact-desktop"],
    });
  },
};
