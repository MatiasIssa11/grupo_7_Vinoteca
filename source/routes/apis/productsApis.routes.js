const { Router } = require("express");
const routes = Router();
const { all, one } = require("../../controllers/apis/productsApi");

routes.get("/", all);
routes.get("/:id", one);

module.exports = routes;
