const { product } = require("../../database/models/index");

module.exports = {
  all: async (req, res) => {
    try {
      let pages = req.query.page ? (parseInt(req.query.page) - 1) * 4 : 0;
      let productsDB = await product.findAll({
        include: { all: true },
        limit: 4,
        offset: pages,
      });

      let previousPage = pages === 0 ? 1 : pages / 4;
      let nextPage = pages / 4 + 2;

      previous = "http://localhost:3000/api/products/?page=" + previousPage;
      next = "http://localhost:3000/api/products/?page=" + nextPage;

      let products = productsDB.map((u) =>
        Object({
          id: u.id,
          brand: u.nameProduct.nameProduct,
          type: u.productType.type,
          price: u.price,
          discountPrice: u.discountPrice,
          image: "http://localhost:3000/products/" + u.images.path,
          alcohol: u.alcohol,
          acidez: u.acidez,
          azucar: u.azucar,
          vista: u.vista,
          nariz: u.nariz,
          boca: u.boca,
          otros: u.otros,
          detail: "http://localhost:3000/api/products/" + u.id,
        })
      );

      let count = await product.count(); //Consulto la cantidad de registros
      let lastPage = Math.trunc(count / 4) + 1;

      let response = {
        count: count,
        products,
        previous,
        next,
        lastPage,
      };

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  one: async (req, res) => {
    try {
      let findProduct = await product.findByPk(req.params.id, {
        include: { all: true },
      });

      if (!findProduct) {
        return res.status(404).json("No existe este producto");
      } else {
        let oneProduct = {
          id: findProduct.id,
          brand: findProduct.nameProduct.nameProduct,
          type: findProduct.productType.type,
          price: findProduct.price,
          discountPrice: findProduct.discountPrice,
          image: "http://localhost:3000/products/" + findProduct.images.path,
          alcohol: findProduct.alcohol,
          acidez: findProduct.acidez,
          azucar: findProduct.azucar,
          vista: findProduct.vista,
          nariz: findProduct.nariz,
          boca: findProduct.boca,
          otros: findProduct.otros,
        };

        return res.status(200).json(oneProduct);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
