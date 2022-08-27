const { body } = require("express-validator");
const { user } = require("../database/models/index");
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
    .custom(async (value, { req }) => {
      let { email } = req.body;
      let users = await user.findAll();
      let user = users.find((u) => u.email === email);

      if (!compareSync(value, user.password)) {
        throw new Error("El usuario o contraseña es incorrecto");
      }

      return true;
    }),
];

module.exports = login;
