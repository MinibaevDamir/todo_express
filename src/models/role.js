'use strict';
const {Model} = require('sequelize');

    class Role extends Model {
        static init(sequelize, DataTypes) {
            return super.init({
                    role: DataTypes.STRING,
                }, {
                    sequelize,
                    modelName: 'Role',
                }
            )
        }
        static associate(models) {
            this.hasMany(models.User)
        }
    };

module.exports = Role