module.exports = (sequelize, DataTypes) => {
   let alias = "images";
   let cols = {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    };
      
    let config = {
        timestamps: false,
        deletedAt: false
    };

   const Images = sequelize.define(alias, cols, config);

   Images.associate = function (models) {
       
      Images.hasMany(models.user, {
         as: 'users',
         foreignKey: 'avatar'
      }),
         
      Images.hasOne(models.product, {
         as: 'product',
         foreignKey: 'image'
      })
         
    }

    return Images;
}