const { index, one, create, write } = require("../models/products.model");
const searchCategorias = require("../modules/searchCategorias");

module.exports = {
  detail: (req, res) => {
    let product = one(parseInt(req.params.id));

    if (!product) {
      return res.redirect("/");
    }
    return res.render("/products/detail", {
      title: "Cava Wines-Detalle Producto",
      styles: [
        "/products/product-mobile",
        "/products/product-tablet",
        "/products/product-desktop",
      ],
      product: product,
    });
  },

  cart: (req, res) => {
    let product = index();

    return res.render("./products/cart", {
      title: "Cava Wines-Carrito",
      styles: [
        "/products/cart-mobile",
        "/products/cart-tablet",
        "/products/cart-desktop",
      ],
      product: product,
    });
  },

  products: (req, res) => {
    let product = index();

    return res.render("./products/products", {
      title: "Cava Wines-Buscador",
      styles: [
        "/products/search-mobile",
        "/products/search-tablet",
        "/products/search-desktop",
        "/home-mobile",
        "/home-tablet",
        "/home-desktop",
      ],
      product: product,
      searchCategorias: searchCategorias,
    });
  },

  create: (req, res) => {
    return res.render("./products/create", {
      title: "Cava Wines-Carga Producto",
      styles: [
        "/products/upload-mobile",
        "/products/upload-tablet",
        "/products/upload-desktop",
      ],
    });
  },

  save: (req, res) => {
    //req.body.image = req.files[0].filename;   // Linea comentada hasta que encontremos el error con las imagenes
    let newProduct = create(req.body);
    let products = index();
    products.push(newProduct);
    write(products);
    return res.redirect("/products/");
  },

  edit: (req, res) => {
    return res.render("./products/edit", {
      title: "Cava Wines-Edicion Producto",
      styles: [
        "/products/edit-mobile",
        "/products/edit-tablet",
        "/products/edit-desktop",
      ],
    });
  },

  modify: (req, res) => {}, //COMPLETAR

  destroy: (req, res) => {}, //COMPLETAR
};
