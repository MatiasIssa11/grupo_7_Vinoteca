module.exports = {
  product: (req, res) => {
    return res.render("./products/product", {
      title: "Cava Wines-Producto",
    });
  },

  cart: (req, res) => {
    return res.render("./products/cart", {
      title: "Cava Wines-Carrito",
    });
  },

  search: (req, res) => {
    return res.render("./products/search", {
      title: "Cava Wines-Buscador",
    });
  },
};
