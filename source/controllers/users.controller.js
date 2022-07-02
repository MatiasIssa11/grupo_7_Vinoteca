module.exports = {
  register: (req, res) => {
    return res.render("./users/register", {
      title: "Cava Wines-Registro",
    });
  },

  login: (req, res) => {
    return res.render("./users/login", {
      title: "Cava Wines-Acceso",
    });
  },
};
