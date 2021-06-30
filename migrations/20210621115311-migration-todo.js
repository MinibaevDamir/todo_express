'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('Todos', 'userId', {
        type: Sequelize.STRING,
        allowNull: false
        });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos');
  }
};
