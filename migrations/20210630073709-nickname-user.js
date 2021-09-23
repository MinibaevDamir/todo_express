'use strict';

module.exports = {
   up: async(queryInterface, Sequelize) => {
     await queryInterface.addIndex('Users', ['nickname'], {unique: true})
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');
  }
};
