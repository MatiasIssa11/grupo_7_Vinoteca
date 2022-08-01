const { validationResult } = require("express-validator");
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

  process: (req, res) => {
    let validaciones = validationResult(req);
    let { errors } = validaciones;

    if (errors && errors.length > 0) {
      return res.render("./users/register", {
        title: "Cava Wines-Registro",
        styles: [
          "users/register-mobile",
          "users/register-tablet",
          "users/register-desktop",
        ],
        errors: validaciones.mapped(),
        oldData: req.body,
      });
    }

    req.body.avatar = req.files[0] ? req.files[0].filename : "default-user.svg"; // Levanta archivo del multer (el primero cargado)
    let newUser = create(req.body); // Crea nuevo usuario
    let users = index(); // Trae user.json como obj. literal
    users.push(newUser); // Agrega nuevo usuario al final del objeto literal users
    write(users); // Actualiza el user.json con el nuevo user
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
