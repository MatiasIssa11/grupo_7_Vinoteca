const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");
//const { user } = require("../database/models/index"); //No hay nada que buscar en la base para el edit porque no se permite cambiar el mail

const editUser = [
  body("nombre")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El nombre debe contener mínimo dos caracteres.")
    .bail(),

  body("apellido")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("El apellido debe contener mínimo dos caracteres.")
    .bail(),

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
    .isLength({ min: 4 })
    .withMessage("La contraseña debe contener mínimo cuatro caracteres.")
    .bail(),

  body("passwordConfirmada")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("La contraseña debe contener mínimo cuatro caracteres.")
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
      let extensiones = [".svg", ".png", ".jpg", ".jpeg", ".bmp"];
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

module.exports = editUser;
