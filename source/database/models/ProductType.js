module.exports = (sequelize, DataTypes) => {
  let alias = "productType";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const ProductType = sequelize.define(alias, cols, config);

  ProductType.associate = function (models) {
    ProductType.hasMany(models.product, {
      as: "product",
      foreignKey: "type",
    });
  };

  return ProductType;
};
