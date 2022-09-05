const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");

const editProduct = [
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

  //Cambiar la lógica para que no acepte que no se carguen imagenes
  body("image").custom(async (value, { req }) => {
    let archivos = req.files;

    if (!archivos || !archivos[0]) {
      throw new Error("No se cargó ninguna imagen.");
    }

    let extensiones = [".svg", ".png", ".jpg", ".jpeg", ".bmp", ".gif"];
    let imagen = archivos[0];
    let extension = extname(imagen.filename);

    if (!extensiones.includes(extension)) {
      unlinkSync(
        resolve(__dirname, "../../uploads/", "products", imagen.filename)
      );
      throw new Error("La imagen no tiene una extension valida.");
    }

    if (imagen.size > 2097152) {
      /*2MB*/ unlinkSync(
        resolve(__dirname, "../../uploads/", "products", imagen.filename)
      );
      throw new Error("La imagen supera el peso de 2MB.");
    }
    return true;
  }),

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

module.exports = editProduct;
