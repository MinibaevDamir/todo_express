const db = require("../models");
const Todo = db.Todos;
const { Op } = require("sequelize");

async function create(req, res) {
    const todo = {
        title: req.body.title,
        status: false,
        userId: req.user.id
    };

    const data = await Todo.create(todo)
    if (data) {
        res.json(data);
    }
    if (!data) {
        res.status(500).json({
            message: "Can't create object"
        })
    }
}
async function find(req, res) {

    const userId = req.user.id;
    const title = req.params.title;
    const status = req.params.status;
    const data = await Todo.findAll({where:  {userId: userId,
    status: status, title: { [Op.like]: `%${title}%`}}});
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({
            message: "Can't get tasks"
        });
    }
}
async function findAll(req, res) {
    const userId = req.user.id;
    const data = await Todo.findAll({where: {userId: userId}})
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({
            message: "Can't get tasks"
        });
    }
}
async function deletes(req, res) {
    const id = req.params.id;
    const nums = await Todo.destroy({
        where: {id: id}
    })
        res.status(200).json({message: `Nums: ${nums}`});
}

async function update(req, res) {
    const id = req.params.id;
    const num = await Todo.update(req.body.info, {
        where: {id: id}
    })
    if (num) {
        if (num == 1) {
            res.status(200).json({
                message: "Todo was updated successfully."
            });
        } else {
            res.status(401).json({
                message: `Cannot update Todo with id=${id}. Maybe Todo was not found or req.body is empty!`
            });
        }
    } else {
        res.status(500).json({message: "Error updating Todo with id=" + id});
    }
}

module.exports.create = create;
module.exports.findAll = findAll;
module.exports.update = update;
module.exports.delete = deletes;
module.exports.find = find;
