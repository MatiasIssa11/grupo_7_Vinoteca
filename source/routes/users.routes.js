const { Router } = require("express");
const routes = Router();

const registerValidations = require("../middlewares/register"); // Trae todos los middlewares que estan en middlewares/register.js
const loginValidations = require("../middlewares/login"); // Trae todos los middlewares que estan en middlewares/login.js

const {
  register,
  process,
  login,
  enter,
} = require("../controllers/users.controller");

routes.get("/register", register);
routes.post("/register", [registerValidations], process);

routes.get("/login", login);
routes.post("/login", [loginValidations], enter); // Actualmente solo redirige al index

module.exports = routes;
