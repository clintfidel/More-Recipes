export default (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Recipes', {
    title: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    } ,
    details: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    votes : {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0  
     },
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Recipes.BelongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        })
        Recipes.hasMany(models.Reviews, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'

        })
        Recipes.hasMany(models.Favourites, {
          foreignKey: 'recipeId',
          onDelete: 'CASCADE'
        })
         Recipe.hasMany(models.votes, {
          foreignKey: 'recipeId'
        })
      }
    }
  });
  return Recipes;
};