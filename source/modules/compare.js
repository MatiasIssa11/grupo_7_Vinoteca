module.exports = {
  comparePrice: (a, b) => {
    a.price - b.price;
  },

  compareName: (a, b) => {
    if (a.nameProduct.nameProduct > b.nameProduct.nameProduct) {
      return 1;
    }
    if (a.nameProduct.nameProduct < b.nameProduct.nameProduct) {
      return -1;
    }
    return 0; // a must be equal to b
  },
  compareCategory: (a, b) => {
    if (a.productType.type > b.productType.type) {
      return 1;
    }
    if (a.productType.type < b.productType.type) {
      return -1;
    }
    return 0; // a must be equal to b
  },
};
