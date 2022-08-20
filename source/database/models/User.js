module.exports = (sequelize, DataTypes) => {
   let alias = "user";
   let cols = {
      id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      nombre: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      apellido: {
         type: Sequelize.STRING,
         allowNull: false,
      },
      email: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true,
      },
      fechaNacimiento: {
         type: Sequelize.DATE,
         allowNull: false,
      },
      avatar: {
         type: Sequelize.INTEGER,
         allowNull: false,
      },
      password: {
         type: Sequelize.TEXT,
         allowNull: false,
      },
      isAdmin: {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: false
      
      }
   };
      
    let config = {
        timestamps: false,
        deletedAt: false
    };

    const User = sequelize.define(alias, cols, config);

   User.associate = function (models) {
       
      User.belongsTo(models.image, {
         as: 'images',
         foreignKey: 'avatar'
      }),
         
      User.hasMany(models.cart, {
         as: 'cart',
         foreignKey: 'idUser'
      })
         
    }

    return User;
}