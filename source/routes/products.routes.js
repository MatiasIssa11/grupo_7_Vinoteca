const { Router } = require("express");
const routes = Router();
const {
  cart,
  products,
  detail,
  create,
  save,
  edit,
  modify,
  destroy,
} = require("../controllers/products.controller");

const multer = require("multer");
const storage = require("../modules/storage");
const upload = multer({ storage: storage("products") });

routes.get("/", products); // Listado de productos

routes.get("/create", create); // Formulario de creacion de productos "Create"
routes.post("/save", [upload.any()], save); // Crea el producto en el product.json

routes.get("/cart", cart); // Carrito de compras

routes.get("/edit/:id", edit); // Forulario de edicion de productos
routes.put("/edit/:id", [upload.any()], modify); // Formulario de edicion de productos - Envio

routes.get("/:id", detail); // Detalle producto particular (id)

routes.delete("/delete/:id", destroy); // Formulario de eliminación de productos - Envio

module.exports = routes;
