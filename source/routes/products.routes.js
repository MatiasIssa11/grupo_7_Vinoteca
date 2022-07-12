const { Router } = require("express");
const routes = Router();
const { cart, product, search, upload, edit } = require("../controllers/products.controller");

routes.get("/", search); // Listado de productos
routes.get("/create", upload); // Formulario de creacion de productos "Create"
routes.get("/cart", cart); // Carrito de compras
routes.get("/edit/:id?", edit); // Forulario de edicion de productos
routes.get("/:id?", product); // Detalle producto particular (id)

routes.post("/save", upload); // Creacion de producto

routes.put("/edit/:id?", edit); // Formulario de edicion de productos - Envio

routes.delete("/:id?", edit); // Formulario de edicion de productos - Envio

module.exports = routes;