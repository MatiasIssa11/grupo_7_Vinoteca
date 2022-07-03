const { Router } = require("express");
const routes = Router();
const { cart, product, search, upload, edit } = require("../controllers/products.controller");

routes.get("/:id", product); //Si pongo /product/:id no me reconocé los archivos del public y me agregaga a la ruta /product
routes.get("/cart", cart);
routes.get("/search", search);
routes.get("/upload", upload);
routes.get("/edit", edit);

module.exports = routes;

