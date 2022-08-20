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
<<<<<<< HEAD
      fechaNaciemiento: {
         type: DataTypes.DATE,
=======
      fechaNacimiento: {
         type: Sequelize.DATE,
>>>>>>> 80b907c2bc3ec9dbf43414bb158b770e899ee6ff
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