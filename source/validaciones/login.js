const { body } = require("express-validator");
const { index } = require("../models/users.model");
const { compareSync } = require("bcryptjs");

const login = [
  body("email")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .bail(),

  body("password")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("La contraseña debe contener mínimo cuatro caracteres.")
    .bail()
    .custom((value, { req }) => {
      let { email } = req.body;
      let users = index();
      let user = users.find((u) => u.email === email);

      if (!compareSync(value, user.password)) {
        throw new Error("El usuario o contraseña es incorrecto");
      }

      return true;
    }),
];

module.exports = login;
