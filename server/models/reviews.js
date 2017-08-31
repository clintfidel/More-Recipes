

export default (sequelize, DataTypes) => {
  const reviews = sequelize.define('reviews', {
    userId: {
      type: DataTypes.INTEGER,
      required: true
    },
    recipeId: {
      type: DataTypes.INTEGER,
      required: true
    },
    content: {
      type: DataTypes.TEXT,
      required: true
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        reviews.BelongsTo(models.User, {
          foreignKey: 'userId'
        });
        reviews.BelongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return reviews;
};
