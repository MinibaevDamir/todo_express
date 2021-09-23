'use strict';
const {Model} = require('sequelize');


class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            nickname: DataTypes.STRING,
            password: DataTypes.STRING,
            color: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                validate: {isEmail: true}
            },
            roleId: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            }
        }, {
            sequelize,
            modelName: 'User',
        })
    }

    static associate(models) {
        this.hasMany(models.userTodosMap, {
            foreignKey: 'userId',
            targetKey: 'id',
            as: 'userLink',
        })
    }
};


module.exports = User;