module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
          },
          title: {
          type: Sequelize.STRING,
           allowNull: false
        }, 
          description: {
          type: Sequelize.TEXT,
           allowNull: false
        }, 
          details: {
          type: Sequelize.STRING,
           allowNull: false
        }, 
          instructions: {
          type: Sequelize.TEXT,
           allowNull: false
        }, 
          userId: {
          type: Sequelize.INTEGER,
           allowNull: false 
        }, 
          createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        }, 
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Recipes');
  }
};