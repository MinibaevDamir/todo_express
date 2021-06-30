const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const db = require("../models");
const User = db.Users;

process.env.SECRET_KEY = 'secret'

async function create(req, res) {
    const userData = {nickname: req.body.nickname, password: req.body.password, email: req.body.email}
    const user = await User.findOne({
        where: {
            nickname: userData.nickname
        }
    })
    if (!user) {
        bcrypt.hash(req.body.password, 11, async (err, hash) => {
            userData.password = hash;
            const data = await User.create(userData)
            if(data){
                res.status(201).json({message: "User is successfully created"})
            } else
            {
                res.status(500).json({ error: "Can't create object"});
            }
        })
    } else res.status(400).send({error: "User is already exists"})
}

async function login(req, res) {
    const user = await User.findOne({
        where: {nickname: req.body.nickname}
    })
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
                expiresIn: 1440
            })
            res.status(201).json({token})
        } else {
            res.status(403).json({error: 'Incorrect password'})
        }
    } else {
        res.status(400).json({error: 'User does not exist'})
    }
}

module.exports.create = create;
module.exports.login = login;