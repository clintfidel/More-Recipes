module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        args: true,
        message: 'recipe name already exist '
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    descriptions: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        key: 'id',
        as: 'userId'
      }
    }
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Favourite, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE'
    });
    Recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId'
    });
  };
  return Recipe;
};
