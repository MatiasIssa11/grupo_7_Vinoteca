module.exports = {
  home: (req, res) => {
    return res.render("index", {
      title: "Cava Wines-Home",
      styles: ["home-mobile", "home-tablet", "home-desktop"],
    });
  },

  ageCheck: (req, res) => {
    return res.render("agecheck", {
      title: "Cava Wines-Verificación de edad",
    });
  },

  contact: (req, res) => {
    return res.render("contact", {
      title: "Cava Wines-Contacto",
    });
  },
};
