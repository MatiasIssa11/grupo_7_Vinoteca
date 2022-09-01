module.exports = (sequelize, DataTypes) => {
  let alias = "user";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  };

  let config = {
    timestamps: false,
    deletedAt: false,
  };

  const User = sequelize.define(alias, cols, config);

  User.associate = function (models) {
    User.belongsTo(models.image, {
      as: "image",
      foreignKey: "avatar",
    }),
      User.hasMany(models.cart, {
        as: "cart",
        foreignKey: "idUser",
      });
  };

  return User;
};
