module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.burger, {
            onDelete: "cascade"
          });
        }
      }
    });
  return User
}