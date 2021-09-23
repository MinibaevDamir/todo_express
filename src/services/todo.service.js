const db = require("../models");
const Todo = db.Todo;
const {Op} = require("sequelize");


exports.todoCreate = async function (todo, userId) {
    return await Todo.create(todo, {userId: userId})
}


exports.todoFindWithCompleted = async function (id, username, where) {
    const scopes = [{method: ['withUser', id]}, {method: ['withOwner']}]
    return await Todo.scope(...scopes).findAll(
        {
            limit: 5, order: [['updatedAt', 'DESC']],
            where,
            having: {
                "having_access.nickname": {
                    [Op.substring]: username
                }
            }
        })
}
exports.todoFind = async function (id, username, where) {
    const scopes = [{method: ['withUser', id]}, {method: ['withOwner']}]
    return await Todo.scope(...scopes).findAll(
        {
            where,
            having: {
                "having_access.nickname": {
                    [Op.substring]: username
                }
            }
        })
}


exports.todoMultipleFind = async function (ids) {
 
    let scopes;
    if(typeof ids === "string") scopes = [{method: ['withUser', ids]}]
    else  scopes = [{method: ['withUsers', ids]}]
    return await Todo.scope(...scopes).findAll()
}


exports.todoDestroy = async function (id) {
    return await Todo.destroy({
        where: {id: id}
    })
}
exports.todoUpdate = async function (body, id) {
    return await Todo.update(body, {
        where: {id: id}
    })
}


