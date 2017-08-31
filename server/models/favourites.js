
export default (sequelize, DataTypes) => {
  const Favourites = sequelize.define('Favourites', {
    userId: DataTypes.INTEGER,
    recipeId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Favourites.BelongsTo(models.Users, {
          foreignKey: 'userId'
        });
        Favourites.BelongsTo(models.Recipes, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Favourites;
};
