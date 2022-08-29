module.exports = (sequelize, DataTypes) => {
  let alias = "nameProduct";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const NameProduct = sequelize.define(alias, cols, config);

  NameProduct.associate = function (models) {
    NameProduct.hasMany(models.product, {
      //as: "product",
      foreignKey: "brand",
    });
  };

  return NameProduct;
};
