const { index, one, create, write } = require("../models/products.model");
const searchCategorias = require("../modules/searchCategorias");
const {
  compareName,
  comparePrice,
  compareCategory,
} = require("../modules/compare");

module.exports = {
  detail: (req, res) => {
    let product = one(parseInt(req.params.id));

    if (!product) {
      return res.redirect("/");
    }
    return res.render("./products/detail", {
      title: "Cava Wines-Detalle Producto",
      styles: [
        "/products/detail-mobile",
        "/products/detail-tablet",
        "/products/detail-desktop",
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

  buy: (req, res) => {
    return res.redirect("/products/cart");
  },

  products: (req, res) => {
    let product = index();

    //Buscador
    if (req.query.search && req.query) {
      req.query.search = req.query.search.toLowerCase();
      product = product.filter((p) =>
        (p.nameProduct + "" + p.type).toLowerCase().includes(req.query.search)
      );
    }

    //Filtro lista
    if (req.query && req.query.lista) {
      product = product.filter((p) => p.type.includes(req.query.lista));
    }

    //Orden
    if (req.query && req.query.orden) {
      switch (req.query.orden) {
        case "vacio":
          product = product;
          break;
        case "precioAsc":
          product = product.sort(comparePrice).reverse();
          break;
        case "precioDesc":
          product = product.sort(comparePrice);
          break;
        case "marca":
          product = product.sort(compareName);
          break;
        case "categoria":
          product = product.sort(compareCategory);
          break;
        default:
          product = product;
          break;
      }
    }

    return res.render("./products/products", {
      title: "Cava Wines-Buscador",
      styles: [
        "/products/products-mobile",
        "/products/products-tablet",
        "/products/products-desktop",
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
        "/products/create-mobile",
        "/products/create-tablet",
        "/products/create-desktop",
      ],
    });
  },

  save: (req, res) => {
    req.body.image = req.files[0].filename;
    let newProduct = create(req.body);
    let products = index();
    products.push(newProduct);
    write(products);
    return res.redirect("/products/");
  },

  edit: (req, res) => {
    let product = one(parseInt(req.params.id));

    if (!product) {
      return res.redirect("/products/");
    }
    return res.render("./products/edit", {
      title: "Cava Wines-Edicion Producto",
      styles: [
        "/products/edit-mobile",
        "/products/edit-tablet",
        "/products/edit-desktop",
      ],
      product: product,
    });
  },

  modify: (req, res) => {
    let product = one(parseInt(req.params.id));
    let products = index();
    let productsModified = products.map((p) => {
      if (p.id == product.id) {
        p.nameProduct = req.body.nameProduct;
        p.type = req.body.type;
        p.price = parseInt(req.body.price);
        p.image =
          req.files && req.files.length > 0 ? req.files[0].filename : p.image;
        p.alcohol = req.body.alcohol;
        p.acidez = req.body.acidez;
        p.azucar = req.body.azucar;
        p.vista = req.body.vista;
        p.nariz = req.body.nariz;
        p.boca = req.body.boca;
        p.otros = req.body.otros;
      }
      return p;
    });
    write(productsModified);
    return res.redirect("/products/" + product.id);
  },

  destroy: (req, res) => {
    let product = one(parseInt(req.params.id));
    if (!product) {
      return res.redirect("/products/");
    }
    let products = index();
    let productsDeleted = products.filter((p) => p.id !== product.id);
    write(productsDeleted);
    return res.redirect("/products/");
  },
};
