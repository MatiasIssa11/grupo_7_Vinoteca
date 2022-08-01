const { Router } = require("express");
const routes = Router();
const middlewares = require("../middlewares/register"); // Trae todos los middlewares que estan en middlewares/register.js
const {
  register,
  process,
  login,
  enter,
} = require("../controllers/users.controller");

routes.get("/register", register);
routes.post("/register", middlewares, process);

routes.get("/login", login);
routes.post("/enter", enter); // Actualmente solo redirige al index

module.exports = routes;
