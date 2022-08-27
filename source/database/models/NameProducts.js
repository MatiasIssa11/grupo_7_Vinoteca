module.exports = (sequelize, DataTypes) => {
  let alias = "nameProducts";
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

  const NameProducts = sequelize.define(alias, cols, config);

  NameProducts.associate = function (models) {
    NameProducts.hasMany(models.product, {
      as: "product",
      foreignKey: "brand",
    })
  };

  return NameProducts;
};
