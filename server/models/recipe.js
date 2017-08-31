

export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    userId: {
      type: DataTypes.INTEGER,
      required: true
    },
    title: {
      type: DataTypes.STRING,
      required: true
    },
    Details: {
      type: DataTypes.ARRAY,
      required: true
    },
    Instructions: {
      type: DataTypes.TEXT,
      required: true
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Recipe.hasMany(models.favourite, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        });
        Recipe.BelongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Recipe;
};
