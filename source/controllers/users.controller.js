module.exports = {
  register: (req, res) => {
    return res.render("./users/register", {
      title: "Cava Wines-Registro",
      styles: [
        "/users/login-mobile",
        "/users/login-tablet",
        "/users/login-desktop",
      ],
    });
  },

  login: (req, res) => {
    return res.render("./users/login", {
      title: "Cava Wines-Acceso",
      styles: [
        "/users/register-mobile",
        "/users/register-tablet",
        "/users/register-desktop",
      ],
    });
  },
};
