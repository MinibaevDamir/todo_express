'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('userTodosMaps', 'userId', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users", key: 'id'
                },
                onDelete: 'CASCADE',
            }),
            queryInterface.changeColumn('userTodosMaps', 'todoId', {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Todos", key: 'id'
                },
                onDelete: 'CASCADE',
            })
        ])
    },

    down: async (queryInterface, Sequelize) => {

    }
};
