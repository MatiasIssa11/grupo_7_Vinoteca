const { Router } = require("express");
const routes = Router();

const registerValidations = require("../middlewares/registerMiddleware"); // Trae todos los middlewares que estan en middlewares/register.js
const loginValidations = require("../middlewares/loginMiddleware"); // Trae todos los middlewares que estan en middlewares/login.js
const isAdmin = require("../middlewares/isAdminMiddleware");

const {
  register,
  process,
  edit,
  modify,
  login,
  enter,
  logout,
} = require("../controllers/users.controller");

routes.get("/register", register);
routes.post("/register", [registerValidations], process);

routes.get("/edit/:id", [isAdmin], edit); // Formulario de edicion de usuarios
routes.put("/edit/:id", [registerValidations], modify); // Formulario de edicion de usuario - Envio

routes.get("/login", login);
routes.post("/login", [loginValidations], enter);
routes.get("/logout", logout); //Logout del usuario

module.exports = routes;
