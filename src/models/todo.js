const User = require("./user");
const UserTodos = require("./userTodos");

const {Model} = require("sequelize");
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");
const scopes = {
    withUsers(userIds){
        return {
            include: [{
                association: 'links',
                where: {userId : {[Op.or]: userIds}},
                attributes: []
            }]
        }
    },
    withUser(userId) {
        return {
            include: [{
                association: 'links',
                where: {userId},
                attributes: []
            }]
        }
    },
    withOwner() {
        return {
            include: [{
                model: Todo, as: "having_access",
                required: true,
                attributes: [[Sequelize.fn("GROUP_CONCAT", Sequelize.col('`having_access->links->userLink`.`nickname`')), "nickname"],],
                include: [{
                    association: 'links',
                    required: true,
                    attributes: [],
                    include: [{
                        required: true,
                        association: 'userLink',
                        attributes: [],

                    }]
                }],
            }],
            group: ['`having_access`.`id`'],
        }
    }
}

class Todo extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
                title: DataTypes.STRING,
                status: DataTypes.BOOLEAN,
            }, {
                sequelize,
                hooks: {
                    async afterCreate(attributes, options) {

                        let userTodos = []
                        const user = await User.findAll({where: {roleId: 2}})

                        user.map(async (u) => {
                            userTodos.push({userId: u.id, todoId: attributes.id})
                        })

                        userTodos.push({userId: options.userId, todoId: attributes.id})

                        await UserTodos.bulkCreate(userTodos, {updateOnDuplicate: ["userId", "todoId"]})
                    },
                },
                scopes,
                modelName: 'Todo'
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.userTodosMap, {
            foreignKey: 'id',
            targetKey: 'todoId',
            as: 'links'
        })
        this.belongsTo(models.Todo, {
            foreignKey: 'id',
            targetKey: 'id',
            as: 'having_access'
        })
    }
}

module.exports = Todo;
