module.exports = (sequelize, DataTypes) => {
  let alias = "image";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const Images = sequelize.define(alias, cols, config);

  Images.associate = function (models) {
    Images.hasMany(models.user, {
      as: "user",
      foreignKey: "avatar",
    }),
      Images.hasOne(models.product, {
        as: "product",
        foreignKey: "image",
      });
  };

  return Images;
};
