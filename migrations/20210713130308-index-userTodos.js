'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('userTodosMaps', ['userId', 'todoId'], {unique: true})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('userTodosMaps', ['userId', 'todoId'], {unique: true})
  }
};
