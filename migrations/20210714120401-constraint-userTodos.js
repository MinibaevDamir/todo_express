'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint('userTodosMaps', 'userTodosMaps_ibfk_2'),
            queryInterface.removeConstraint('userTodosMaps', 'userTodosMaps_ibfk_1')
        ])
    },

    down: async (queryInterface, Sequelize) => {
    }
};
