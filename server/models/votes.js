
export default (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.INTEGER,
      required: true
    },
    recipeId: {
      type: DataTypes.INTEGER,
      required: true
    },
    rate: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        votes.BelongsTo(models.User, {
          foreignKey: 'userId'
        });
        votes.BelongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return votes;
};
