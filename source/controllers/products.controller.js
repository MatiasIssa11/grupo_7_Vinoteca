const {index, one, create, write} = require('../models/products.model');
const searchCategorias = require("../modules/searchCategorias");

module.exports = {

  product: (req, res) => {
    let product = one(parseInt(req.params.id));

    if(!product){
      return res.redirect('/')
    }
    return res.render('products/product', {
      title: 'Cava Wines-Detalle Producto',
      styles: [
        "/products/product-mobile",
        "/products/product-tablet",
        "/products/product-desktop",
      ],
      product: product,
    })
  },

  cart: (req, res) => {
    let product = index()

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

  search: (req, res) => {
    let product = index()

    return res.render("./products/search", {
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

  upload: (req, res) => {
    return res.render("products/upload", {
      title: "Cava Wines-Carga Producto",
      styles: [
        "/products/upload-mobile",
        "/products/upload-tablet",
        "/products/upload-desktop",
      ],
    });
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
};
