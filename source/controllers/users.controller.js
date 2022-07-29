const { index, one, create, write } = require("../models/users.model");

module.exports = {
  register: (req, res) => {
    return res.render("./users/register", {
      title: "Cava Wines-Registro",
      styles: [
        "users/register-mobile",
        "users/register-tablet",
        "users/register-desktop",
      ],
    });
  },

  save: (req, res) => {
    req.body.avatar = req.files[0].filename;
    let newUser = create(req.body);
    let users = index();
    users.push(newUser);
    write(users);
    return res.redirect("/users/login");
  },

  login: (req, res) => {
    return res.render("./users/login", {
      title: "Cava Wines-Acceso",
      styles: [
        "users/login-mobile",
        "users/login-tablet",
        "users/login-desktop",
      ],
    });
  },

  enter: (req, res) => {
    return res.redirect("/");
  },
};
