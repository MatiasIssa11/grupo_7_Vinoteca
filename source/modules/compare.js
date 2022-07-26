module.exports = {
  comparePrice: (a, b) => {
    a.price - b.price;
  },

  compareName: (a, b) => {
    if (a.nameProduct > b.nameProduct) {
      return 1;
    }
    if (a.nameProduct < b.nameProduct) {
      return -1;
    }
    return 0; // a must be equal to b
  },
  compareCategory: (a, b) => {
    if (a.type > b.type) {
      return 1;
    }
    if (a.type < b.type) {
      return -1;
    }
    return 0; // a must be equal to b
  },
};
