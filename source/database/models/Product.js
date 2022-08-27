module.exports = (sequelize, DataTypes) => {
  let alias = "product";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discountPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alcohol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    acidez: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    azucar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vista: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nariz: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    boca: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    otros: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  };
  let config = {
    timestamps: false,
    deletedAt: false,
  };
  const Product = sequelize.define(alias, cols, config);

  Product.associate = function (models) {
    Product.belongsTo(models.nameProducts, {
      as: "nameProducts",
      foreignKey: "brand",
    }),
    Product.belongsTo(models.productType, {
      as: "productType",
      foreignKey: "type",
    })
  };

  return Product;
};
