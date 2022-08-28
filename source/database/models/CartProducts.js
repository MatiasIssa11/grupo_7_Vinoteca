module.exports = (sequelize, DataTypes) => {
  let alias = "cartProduct";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idCart: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceProducts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const CartProducts = sequelize.define(alias, cols, config);

  CartProducts.associate = function (models) {
    CartProducts.belongsTo(models.cart, {
      as: "cart",
      foreignKey: "id",
    });
  };

  return CartProducts;
};
