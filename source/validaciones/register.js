const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");
const { index } = require("../models/users.model");

const register = [
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

  body("email")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isEmail()
    .withMessage("El formato de email no es válido.")
    .bail()
    .custom((value) => {
      let users = index();
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
    .custom((value) => {
      let diferenciaFecha = new Date() - new Date(value).getTime();
      //let mayoriaEdad = 1000 * 60 * 60 * 24 * 365 * 18; //18 años en milisegundos
      let diferenciaAnos = new Date(diferenciaFecha).getUTCFullYear() - 1970;
      if (diferenciaAnos < 18) {
        //if (new Date(diferenciaFecha) < mayoriaEdad) {
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
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas deben ser identicas.");
      }
      return true;
    }),

  body("avatar").custom((value, { req }) => {
    //Queremos cambiarlo para que si no encuntra una imagen lo deje avanzar y que después se cargue la imagen por default

    if (req.files && req.files[0]) {
      /*if (!archivos || archivos.length == 0) {
      throw new Error("No se subio ninguna imagen");
    }*/
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

module.exports = register;
