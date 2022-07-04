const data = require("../modules/data");

module.exports = {
  product: (req, res) => {
    let idProduct = parseInt(req.params.id);
    idProduct = !idProduct ? 1 : idProduct; //Para asegurarme de que tenga un valor el IdPrduct

    return res.render("./products/product", {
      title: "Cava Wines-Producto",
      styles: [
        "products/product-mobile",
        "products/product-tablet",
        "products/product-desktop",
      ],
      data: data.find((element) => element.id === idProduct),
    });
  },

  cart: (req, res) => {
    return res.render("./products/cart", {
      title: "Cava Wines-Carrito",
      styles: [
        "products/cart-mobile",
        "products/cart-tablet",
        "products/cart-desktop",
      ],
      data: data,
    });
  },

  search: (req, res) => {
    return res.render("./products/search", {
      title: "Cava Wines-Buscador",
      styles: [
        "/products/search-mobile",
        "/products/search-tablet",
        "/products/search-desktop",
      ],
      data: data,
    });
  },

  upload: (req, res) => {
    return res.render("./products/upload", {
      title: "Cava Wines-Carga Producto",
      styles: [
        "/products/upload-mobile",
        "/products/upload-tablet",
        "/products/upload-desktop",
      ],
      data: data,
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
      data: data,
    });
  },
};
