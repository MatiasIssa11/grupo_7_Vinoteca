const { Router } = require("express");
const { check } = require("express-validator"); //Función del express validator para verificar como middleware
const routes = Router();
const {
  register,
  login,
  save,
  enter,
  procesRegister,
} = require("../controllers/users.controller");

///////////////// Validacion incompleta - No funca:

const validations = [
  check('nombre').notEmpty().withMessage('Este campo es obligatorio'),
  check('apellido').notEmpty().withMessage('Este campo es obligatorio'),
  check('email').notEmpty().withMessage('Este campo es obligatorio'),
  check('fechaNacimiento').notEmpty().withMessage('Este campo es obligatorio'),
  check('password').notEmpty().withMessage('Este campo es obligatorio')
];

/////////////////

const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("users") });

routes.get("/register", register);
routes.post("/save", [upload.any()], validations, save, procesRegister); //Guardado de datos en el registro

routes.get("/login", login);
routes.post("/enter", enter); //Actualmente solo redirige al index

module.exports = routes;
