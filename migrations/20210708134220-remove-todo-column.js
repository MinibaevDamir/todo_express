'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Todos', 'username')
  },

  down: async (queryInterface, Sequelize) => {

  }
};
