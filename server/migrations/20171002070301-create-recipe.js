module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    recipeName: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: {
        args: true,
        message: 'recipe name already exist '
      }
    },
    ingredients: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    descriptions: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    votes: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    userId: {
      type: Sequelize.INTEGER,
      required: true,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }

    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface => queryInterface.dropTable('Recipes'))
};
