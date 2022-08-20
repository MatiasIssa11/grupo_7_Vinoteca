module.exports = (sequelize, DataTypes) => {
   let alias = "cartProducts";
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
        deletedAt: false
    };

   const CartProducts = sequelize.define(alias, cols, config);

   return CartProducts;
}