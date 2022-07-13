const { Router } = require("express");
const routes = Router();
const {cart, products, detail, create, save, edit} = require("../controllers/products.controller");

const multer = require('multer');
const storage = require('../modules/storage')
const upload = multer({storage: storage('products')});

routes.get("/", products); // Listado de productos
routes.get("/create", create); // Formulario de creacion de productos "Create"
routes.get("/cart", cart); // Carrito de compras
routes.get("/edit/:id", edit); // Forulario de edicion de productos
routes.get("/:id", detail); // Detalle producto particular (id)

routes.post("/save", [upload.any()], save); // Crea el producto en el product.json

routes.put("/edit/:id", edit); // Formulario de edicion de productos - Envio

routes.delete("/:id", edit); // Formulario de eliminación de productos - Envio

module.exports = routes;