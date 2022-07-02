module.exports = {
  product: (req, res) => {
    return res.render("./products/product", {
      title: "Cava Wines-Producto",
    });
  },

  cart: (req, res) => {
    return res.render("./products/cart", {
      title: "Cava Wines-Carrito",
      styles: ['/products/cart-mobile','/products/cart-tablet','/products/cart-desktop']
    });
  },

  search: (req, res) => {
    return res.render("./products/search", {
      title: "Cava Wines-Buscador",
    });
  },
};
