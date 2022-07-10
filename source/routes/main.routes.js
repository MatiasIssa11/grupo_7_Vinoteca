const {Router} = require("express");
const routes = Router();
const {home, contact, ageCheck} = require("../controllers/main.controller");

routes.get("/", home);
routes.get("/agecheck", ageCheck);
routes.get("/contact", contact);

module.exports = routes;
