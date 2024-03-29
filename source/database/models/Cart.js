module.exports = (sequelize, DataTypes) => {
  let alias = "cart";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    envio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const Cart = sequelize.define(alias, cols, config);

  Cart.associate = function (models) {
    Cart.belongsTo(models.user, {
      as: "user",
      foreignKey: "idUser",
    });
    Cart.belongsToMany(models.product, {
      through: "cartProducts",
      foreignKey: "idCart",
      otherKey: "idProducts"
    });
  };

  return Cart;
};
