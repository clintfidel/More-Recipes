module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    downvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }

  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
    });
  };
  return Vote;
};
