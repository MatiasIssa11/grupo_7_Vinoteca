const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");
const { user } = require("../database/models/index");

const register = [
  body("nombre")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe contener como mínimo dos caracteres.")
    .bail(),

  body("apellido")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe contener como mínimo dos caracteres.")
    .bail(),

  body("email")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .bail()
    .custom(async (value) => {
      let users = await user.findAll();
      users = users.map((u) => u.email);
      if (users.includes(value)) {
        throw new Error("El email ya esta registrado.");
      }
      return true;
    }),

  body("fechaNacimiento")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isDate()
    .withMessage("La fecha de nacimiento debe tener formato de fecha.")
    .bail()
    .custom(async (value) => {
      let diferenciaFecha = new Date() - new Date(value).getTime();
      let diferenciaAnos = new Date(diferenciaFecha).getUTCFullYear() - 1970;
      if (diferenciaAnos < 18) {
        throw new Error("El usuario debe ser mayor de 18 años.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener mínimo 8 caracteres.")
    .bail()
    .isStrongPassword({
      //Verifica si cumple las condiciones de condicion fuerte
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage(
      "La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial"
    )
    .bail(),

  body("passwordConfirmada")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe contener mínimo 8 caracteres.")
    .bail()
    .isStrongPassword({
      //Verifica si cumple las condiciones de password fuerte
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
    .withMessage(
      "La contraseña debe contener al menos una letra mayuscula, una letra minuscula, un numero y un caracter especial"
    )
    .bail()
    .custom(async (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas deben ser identicas.");
      }
      return true;
    }),

  body("avatar").custom(async (value, { req }) => {
    if (req.files && req.files[0]) {
      let archivos = req.files;
      let extensiones = [".svg", ".png", ".jpg", ".jpeg", ".bmp", ".gif"];
      let avatar = archivos[0];
      let extension = extname(avatar.filename);

      if (!extensiones.includes(extension)) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "users", avatar.filename)
        );
        throw new Error("La imagen no tiene una extension valida.");
      }

      if (avatar.size > 2097152 /*2MB*/) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "users", avatar.filename)
        );
        throw new Error("La imagen supera el peso de 2MB.");
      }
      return true;
    }
    return true; //Este caso es para cuando no se carga imagen, tiene que retornar un true
  }),
];

module.exports = register;
