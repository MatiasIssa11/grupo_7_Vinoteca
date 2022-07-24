const { Router } = require("express");
const routes = Router();
const {
  register,
  login,
  save,
  enter,
} = require("../controllers/users.controller");

routes.get("/register", register);
routes.post("/register", save); //Actualmente solo redirige al login

routes.get("/login", login);
routes.post("/login", enter); //Actualmente solo redirige al index

module.exports = routes;
