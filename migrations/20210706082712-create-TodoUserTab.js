'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userTodosMaps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", key: 'id'
        },
      },
      todoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Todos", key: 'id'
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('userTodosMaps')
  }};
