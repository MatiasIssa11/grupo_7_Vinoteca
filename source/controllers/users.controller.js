const { index, one, create, write } = require("../models/users.model");
const { validationResult } = require('express-validator');

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

  ////////////////////////////////////// Validacion - mensajes de error - No funca:
  procesRegister: (req, res) => {
      
    const resultValidation = validationResult(req);

    if (resultValidation.errors.lenght > 0) {
      return res.render("./users/register", {
        errors: resultValidation.mapped()
      });
    }
  },
/////////////////////////////////////

  save: (req, res) => {
    req.body.avatar = req.files[0].filename; // Levanta archivo del multer (el primero cargado)
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
