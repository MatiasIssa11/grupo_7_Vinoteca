const { body } = require("express-validator");
const { extname, resolve } = require("path");
const { unlinkSync } = require("fs");

const editProduct = [
  body("brand")
    .notEmpty()
    .withMessage("Este campo es obligatorio.")
    .bail()
    .isLength({ min: 5 })
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
    .isLength({ min: 3 })
    .withMessage("El precio del vino debe contener como mínimo 4 números.")
    .bail(),

  body("discountPrice")
    .custom(async (value, { req }) => {
      if (req.body.discountPrice) {
        if (req.body.discountPrice.length < 3) {
          throw new Error("El precio del descuento del vino debe contener como mínimo 3 números."
          );
        }
      } return true;
    }),

  body("image").custom(async (value, { req }) => {
      if (req.files && req.files[0]) {
      let archivos = req.files;
      let extensiones = [".svg", ".png", ".jpg", ".jpeg", ".bmp", ".gif"];
      let image = archivos[0];
      let extension = extname(image.filename);

      if (!extensiones.includes(extension)) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "products", image.filename)
        );
        throw new Error("La imagen no tiene una extension valida.");
      }

      if (image.size > 2097152 /*2MB*/) {
        unlinkSync(
          resolve(__dirname, "../../uploads/", "products", image.filename)
        );
        throw new Error("La imagen supera el peso de 2MB.");
      }
      return true;
    }
    return true; //Este caso es para cuando no se carga imagen, tiene que retornar un true
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
