module.exports = (sequelize, DataTypes) => {
   let alias = "cart";
   let cols = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idUser: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      envio: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    };
      
    let config = {
        timestamps: false,
        deletedAt: false
    };

   const Cart = sequelize.define(alias, cols, config);

   Cart.associate = function (models) {
       
      Cart.belongsTo(models.user, {
         as: 'users',
         foreignKey: 'idUser'
      }),
         
         Cart.belongTo(models.product, {
         through: cartProducts,
         foreignKey: 'idCart'
      })
         
    }

    return Cart;
}