const { Router } = require("express");
const routes = Router();
const { cart, product, search } = require("../controllers/products.controller");

routes.get("/product", product);
routes.get("/cart", cart);
routes.get("/search", search);

module.exports = routes;

