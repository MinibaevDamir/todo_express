const db = require("../models");
const User = db.User;

exports.setAdmin = async function (roleId, id) {
    return await User.update({roleId: roleId}, {where: {id: id}})

}
exports.userFind = async function (nickname) {
    return await User.findOne({
        where: {
            nickname: nickname
        }})
}
exports.userCreate = async function (userData) {
    return await User.create(userData)
}
exports.findByNickname = async function (where) {
    return await User.findAll({where})
}

exports.findByRole = async function (roleId) {
    return await User.findAll({where: {roleId: roleId}})
}
exports.userUpdate = async function (body, id) {
    return await User.update(body, {
        where: {id: id}
    })
}