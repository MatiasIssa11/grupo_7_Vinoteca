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

      let previous = "http://localhost:3000/api/products/?page=" + previousPage;
      let next = "http://localhost:3000/api/products/?page=" + nextPage;

      //Adecuación de los datos del producto

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

      let lastPage = Math.ceil(count / 4);

      //Consulta a la base de datos para sacar las categorias

      let categoriesDB = await product.findAll({
        include: { all: true },
        atributes: ["id", "productType"],
      });

      //Adecuación de los datos

      let categories = categoriesDB.map((u) =>
        Object({
          id: u.id,
          type: u.productType.type,
        })
      );

      //Filtrado y presentación de los datos según categorias fijas

      let categoriesGrouping = {
        malbec: categories.filter((c) =>
          c.type.toLowerCase().includes("malbec")
        ).length,
        cabernet: categories.filter((c) =>
          c.type.toLowerCase().includes("cabernet sauvignon")
        ).length,
        rose: categories.filter((c) => c.type.toLowerCase().includes("rosé"))
          .length,
        bonarda: categories.filter((c) =>
          c.type.toLowerCase().includes("bonarda")
        ).length,
        torrontes: categories.filter((c) =>
          c.type.toLowerCase().includes("torrontés")
        ).length,
        syrah: categories.filter((c) => c.type.toLowerCase().includes("syrah"))
          .length,
      };

      let response = {
        count: count,
        products,
        previous,
        next,
        lastPage,
        categoriesGrouping,
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
