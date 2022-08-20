module.exports = (sequelize, DataTypes) => {
   let alias = "cartProducts";
   let cols = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idCart: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      idProducts: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceProducts: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
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