const { Router } = require("express");
const { check } = require("express-validator"); //Función del express validator para verificar como middleware
const routes = Router();
const {
  register,
  login,
  save,
  enter,
} = require("../controllers/users.controller");

const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("users") });

routes.get("/register", register);
routes.post("/save", [upload.any()], save); //Guardado de datos en el registro

routes.get("/login", login);
routes.post("/enter", enter); //Actualmente solo redirige al index

module.exports = routes;
