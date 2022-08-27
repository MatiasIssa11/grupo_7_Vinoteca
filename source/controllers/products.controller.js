const { index, one, create, write } = require("../models/products.model"); // Models VIEJOS

const searchCategorias = require("../modules/searchCategorias");
const { compareName, comparePrice, compareCategory } = require("../modules/compare");

const {Product, Image, NameProduct, ProductType} = require('../database/models/index') // Models NUEVOS

module.exports = {

  detail: async (req, res) => {
    let product = await Product.findByPk(req.params.id,{include:{all:true}})
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

  cart: async (req, res) => { 
    let product = await Product.findAll({include:{all:true}});
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
    return res.redirect("/products/cart"); // Solo redirecciona
  },

  products: async (req, res) => {
    let product = await Product.findAll({include:{all:true}});

    //Buscador - PENDIENTE MODIFICAR
    if (req.query.search && req.query) {
      req.query.search = req.query.search.toLowerCase();
      product = product.filter((p) =>
        (p.nameProduct + "" + p.type).toLowerCase().includes(req.query.search)
      );
    }

    //Filtro lista - PENDIENTE MODIFICAR
    if (req.query && req.query.lista) {
      product = product.filter((p) => p.type.includes(req.query.lista));
    }

    //Orden - PENDIENTE MODIFICAR
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

  create: async (req, res) => {
    return res.render("./products/create", {
      title: "Cava Wines-Carga Producto",
      styles: [
        "/products/create-mobile",
        "/products/create-tablet",
        "/products/create-desktop",
      ],
    });
  },

  save: async (req, res) => {
    if(req.files && req.files.length > 0){
      let image = await Image.create({
        path: req.files[0].filename
      })
      req.body.image = image.id;
    }
    await Product.create(req.body);
    return res.redirect("/products/");
  },

  edit: async (req, res) => {
    let product = await Product.findByPk(req.params.id,{include:{all:true}})
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

  modify: async (req, res) => {
    let product = await Product.findByPk(req.params.id, { include: { all: true } });
    await product.update({
      brand: req.body.brand,
      type: req.body.type,
      price: parseInt(req.body.price),
      discountPrice: parseInt(req.body.discountPrice),
      image: parseInt(req.body.image), //                VER!!!
      alcohol: req.body.alcohol,
      acidez: req.body.acidez,
      azucar: req.body.azucar,
      vista: req.body.vista,
      nariz: req.body.nariz,
      boca: req.body.boca,
      otros: req.body.otros,
    })
    return res.redirect("/products/" + product.id);
  },

  destroy: async (req, res) => {
    let product = await Product.findByPk(req.params.id,{include:{all:true}})
    if (!product) {
      return res.redirect("/products/");
    }
    await product.destroy() 
    return res.redirect("/products/");
  },
};
