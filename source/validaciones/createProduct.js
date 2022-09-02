const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");
const { product } = require("../database/models/index");

const createProduct = [
  body("brand")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("La marca del vino debe contener como mínimo 4 caracteres.")
    .bail(),

  body("type")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("El tipo de vino debe debe contener como mínimo 4 caracteres.")
    .bail(),

  body("price")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isNumeric()
    .withMessage("El precio debe ser un número.")
    .bail()
    .isLength({ min: 4 })
    .withMessage("El precio del vino debe contener como mínimo 4 números.")
    .bail(),

  body("discountPrice")
    .isNumeric()
    .withMessage("El precio del descuento debe ser un número.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "El precio del descuento del vino debe contener como mínimo 4 números."
    )
    .bail(),

  /*     //Cambiar la lógica para que no acepte que no se carguen imagenes
  body("image").custom(async (value, { req }) => {
    if (req.files && req.files[0]) {
      let archivos = req.files;
      let extensiones = [".svg", ".png", ".jpg", ".jpeg", ".bmp", ".gif"];
      let avatar = archivos[0];
      let extension = extname(avatar.filename);

      if (!extensiones.includes(extension)) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "products", image.filename)
        );
        throw new Error("La imagen no tiene una extension valida.");
      }

      if (avatar.size > 2097152 ) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "products", avatar.filename)
        );
        throw new Error("La imagen supera el peso de 2MB.");
      }
      return true;
    }
    return true; //Este caso es para cuando no se carga imagen, tiene que retornar un true
  }),
  */

  body("alcohol")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "El porcentaje de alcohol del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),

  body("acidez")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "El porcentaje de acidez del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),

  body("azucar")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "El porcentaje de azucar del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),

  body("vista")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "La caracteristica visual del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),

  body("nariz")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "La caracteristica olfativa del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),

  body("boca")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 4 })
    .withMessage(
      "La caracteristica degustativa del vino debe contener como mínimo 4 caracteres."
    )
    .bail(),
];

module.exports = createProduct;
