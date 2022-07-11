const { Router } = require("express");
const routes = Router();
const { cart, product, search, upload, edit } = require("../controllers/products.controller");

routes.get("/products/:id?", product); 
routes.get("/cart", cart);
routes.get("/search", search);

routes.get("/upload", upload);
routes.post("/upload", upload);

routes.get("/edit", edit);
routes.put("/edit", edit);

module.exports = routes;