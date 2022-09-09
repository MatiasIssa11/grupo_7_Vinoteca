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
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener mínimo 8 caracteres.") 
    .bail()
    .custom(async (value, { req }) => {
      let { email } = req.body;
      let oneUser = await user.findOne({ where: { email: email } });

      if (!compareSync(value, oneUser.password)) {
        throw new Error("El usuario o contraseña es incorrecto");
      }

      return true;
    }),
];

module.exports = login;
