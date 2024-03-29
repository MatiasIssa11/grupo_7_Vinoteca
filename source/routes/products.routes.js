const { Router } = require("express");
const routes = Router();
const {  cart,  products,  detail,  create,  save,  edit,  modify,  destroy,  buy,} = require("../controllers/products.controller");

const isLogged = require("../middlewares/isLoggedMiddleware");
const createMiddleware = require("../middlewares/createProductMiddleware");
const editMiddleware = require("../middlewares/editProductMiddleware");
const isAdmin = require("../middlewares/isAdminMiddleware");

routes.get("/", products); // Listado de productos

routes.get("/create", [isAdmin], create); // Formulario de creacion de productos "Create"
routes.post("/save", [createMiddleware], save); // Crea el producto

routes.get("/cart", [isLogged], cart); // Carrito de compras
routes.post("/cart", buy); // Comprar con el carrito, por ahora solo redirecciona

routes.get("/edit/:id", [isAdmin], edit); // Formulario de edicion de productos
routes.put("/edit/:id", [editMiddleware], modify); // Formulario de edicion de productos - Envio

routes.get("/:id", detail); // Detalle producto particular (id)

routes.delete("/delete/:id", destroy); // Formulario de eliminación de productos - Envio

module.exports = routes;
