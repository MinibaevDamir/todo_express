const Sequelize = require('sequelize');
const User = require('../models/user')
const Role = require('../models/role')
const Todo = require('../models/todo')
const userTodosMap = require('../models/userTodos')

const sequelize = new Sequelize(process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        dialect: 'mysql',
    });

const models = {
    User: User.init(sequelize, Sequelize),
    Role: Role.init(sequelize, Sequelize),
    Todo: Todo.init(sequelize, Sequelize),
    userTodosMap: userTodosMap.init(sequelize, Sequelize)
};

Object.values(models)
    .filter(model => typeof model.associate === "function")
    .forEach(model => model.associate(models));

const db = {...models, sequelize};

module.exports = db;
