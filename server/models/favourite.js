module.exports = (sequelize, DataTypes) => {
  const Favourite = sequelize.define('Favourite', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'Recipe',
        key: 'id',
        as: 'recipeId'
      }
    }
  });
  Favourite.associate = (models) => {
    Favourite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'

    });
    Favourite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'

    });
  };
  return Favourite;
};
