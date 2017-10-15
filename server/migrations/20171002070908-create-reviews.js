module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      reference: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }

    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      hooks: true,
      onDelete: 'CASCADE',
      reference: {
        model: 'Recipes',
        key: 'id',
        as: 'recipeId'
      }
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: false
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
  down: (queryInterface => queryInterface.dropTable('Reviews'))
};
