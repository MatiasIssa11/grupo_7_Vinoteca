const { Router } = require("express");
const routes = Router();
const { register, login } = require("../controllers/users.controller");

routes.get("/register", register);
routes.get("/login", login);

module.exports = routes;
