const { Router } = require("express");
const routes = Router();
const { all, one } = require("../../controllers/apis/usersApi");

routes.get("/", all);
routes.get("/:id", one);

module.exports = routes;
