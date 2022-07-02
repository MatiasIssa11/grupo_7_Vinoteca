const { Router } = require("express");
const routes = Router();
const { cart, product, search, upload, edit } = require("../controllers/products.controller");

routes.get("/product", product);
routes.get("/cart", cart);
routes.get("/search", search);
routes.get("/upload", upload);
routes.get("/edit", edit);

module.exports = routes;

