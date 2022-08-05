const { Router } = require("express");
const routes = Router();
const {
  home,
  contact,
  //ageCheck,
  //ageRedirect,
} = require("../controllers/main.controller");

routes.get("/", home);

routes.get("/contact", contact);

module.exports = routes;
