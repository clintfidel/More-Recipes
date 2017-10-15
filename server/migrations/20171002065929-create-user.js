module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      require: true
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
  down: (queryInterface => queryInterface.dropTable('Users'))
};
