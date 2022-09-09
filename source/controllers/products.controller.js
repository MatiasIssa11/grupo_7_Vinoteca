const searchCategorias = require("../modules/searchCategorias");
const {
  compareName,
  comparePrice,
  compareCategory,
} = require("../modules/compare");
const { validationResult } = require("express-validator");
const {
  product,
  image,
  nameProduct,
  productType,
} = require("../database/models/index"); // Models NUEVOS

module.exports = {
  detail: async (req, res) => {
    let oneProduct = await product.findByPk(req.params.id, {
      include: { all: true },
    });
    if (!oneProduct) {
      return res.redirect("/");
    }
    return res.render("./products/detail", {
      title: "Cava Wines-Detalle Producto",
      styles: [
        "/products/detail-mobile",
        "/products/detail-tablet",
        "/products/detail-desktop",
      ],
      product: oneProduct,
    });
  },

  cart: async (req, res) => {
    let products = await product.findAll({ include: { all: true } });
    return res.render("./products/cart", {
      title: "Cava Wines-Carrito",
      styles: [
        "/products/cart-mobile",
        "/products/cart-tablet",
        "/products/cart-desktop",
      ],
      product: products,
    });
  },

  buy: (req, res) => {
    return res.redirect("/products/cart"); // Solo redirecciona
  },

  products: async (req, res) => {
    let products = await product.findAll({ include: { all: true } });

    //Buscador - PENDIENTE MODIFICAR
    if (req.query.search && req.query) {
      req.query.search = req.query.search.toLowerCase();
      products = products.filter((p) =>
        (p.brand.nameProduct + "" + p.type.type)
          .toLowerCase()
          .includes(req.query.search)
      );
    }

    //Filtro lista - PENDIENTE MODIFICAR
    if (req.query && req.query.lista) {
      products = products.filter((p) =>
        p.productType.type.includes(req.query.lista)
      );
    }

    //Orden - PENDIENTE MODIFICAR
    if (req.query && req.query.orden) {
      switch (req.query.orden) {
        case "vacio":
          products = products;
          break;
        case "precioAsc":
          products = products.sort(comparePrice).reverse();
          break;
        case "precioDesc":
          products = products.sort(comparePrice);
          break;
        case "marca":
          products = products.sort(compareName);
          break;
        case "categoria":
          products = products.sort(compareCategory);
          break;
        default:
          products = products;
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
      product: products,
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

    let validaciones = validationResult(req);
    let { errors } = validaciones;

    if (errors && errors.length > 0) {
      return res.render("./products/create", {
        title: "Cava Wines-Carga Producto",
        styles: [
          "/products/create-mobile",
          "/products/create-tablet",
          "/products/create-desktop",
        ],
        errors: validaciones.mapped(),
        oldData: req.body,
        script: "createProducts.js",
      });
    }

    if (req.files && req.files.length > 0) {
      let newImage = await image.create({
        path: req.files[0].filename,
      });
      req.body.image = newImage.id;
    }

    let newType = await productType.create({
      type: req.body.type,
    });
    req.body.type = newType.id;

    let newBrand = await nameProduct.create({
      nameProduct: req.body.brand,
    });
    req.body.brand = newBrand.id;

    await product.create(req.body);
    return res.redirect("/products/");
  },

  edit: async (req, res) => {
    let oneProduct = await product.findByPk(req.params.id, {
      include: { all: true },
    });
    if (!oneProduct) {
      return res.redirect("/products/");
    }
    return res.render("./products/edit", {
      title: "Cava Wines-Edicion Producto",
      styles: [
        "/products/edit-mobile",
        "/products/edit-tablet",
        "/products/edit-desktop",
      ],
      product: oneProduct,
    });
  },

  modify: async (req, res) => {
    let oneProduct = await product.findByPk(req.params.id, {
      include: { all: true },
    });

    //Edición de producto
    await oneProduct.update({
      //brand: req.body.brand,      //No tiene que modificarse el id de la brand
      //type: req.body.type,        //No tiene que modificarse el id del type
      price: parseInt(req.body.price),
      discountPrice: parseInt(req.body.discountPrice),
      //image: req.body.image,      //No tiene que modificarse el id de la imagen
      alcohol: req.body.alcohol,
      acidez: req.body.acidez,
      azucar: req.body.azucar,
      vista: req.body.vista,
      nariz: req.body.nariz,
      boca: req.body.boca,
      otros: req.body.otros,
    });

    //Edición de brand
    let oneBrand = await nameProduct.findByPk(oneProduct.brand, {
      include: { all: true },
    });

    await oneBrand.update({
      nameProduct: req.body.brand,
    });

    //Edición del type
    let oneType = await productType.findByPk(oneProduct.type, {
      include: { all: true },
    });

    await oneType.update({
      type: req.body.type,
    });

    //Edición de imagen
    let oneImage = await image.findByPk(oneProduct.image, {
      include: { all: true },
    });

    if (req.files && req.files.length > 0) {
      await oneImage.update({
        path: req.files[0].filename,
      });
    }

    return res.redirect("/products/" + product.id);
  },

  destroy: async (req, res) => {
    let oneProduct = await product.findByPk(req.params.id, {
      include: { all: true },
    });
    if (!oneProduct) {
      return res.redirect("/products/");
    }
    await oneProduct.destroy();
    return res.redirect("/products/");
  },
};
