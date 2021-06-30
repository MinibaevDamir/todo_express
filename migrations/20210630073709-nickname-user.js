'use strict';

module.exports = {
   up: async(queryInterface, Sequelize) => {
     await queryInterface.addIndex('Users', ['nickname'])
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');
  }
};
