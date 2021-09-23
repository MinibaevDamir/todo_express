'use strict';
const {Model} = require('sequelize');

class UserTodos extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            userId: DataTypes.INTEGER,
            todoId: DataTypes.INTEGER
        }, {
            timestamps: false,
            sequelize,
            modelName: 'userTodosMap',
        })
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'userId',
            targetKey: 'id',
            as: 'userLink',
        })
    }
}

module.exports = UserTodos;
