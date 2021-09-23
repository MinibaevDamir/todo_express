const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = require("express").Router();
const asyncHandler = require("express-async-handler")
const UserService = require('../services/user.service')
const {Op} = require("sequelize");
const redis_Сlient = require('../redis_connect')
const auth = require("../middleware/auth.middleware")

process.env.SECRET_KEY = 'secret'
process.env.REFRESH_KEY = 'refresh_todo'

findColor = async (req, res) => {
    const userData = await UserService.userFind(req.user.nickname)
    res.status(201).json({color: userData.color})
}
updateColor = async (req, res) => {
    UserService.userUpdate({color: req.body.color}, req.user.id)
    res.status(201).json({color: req.body.color})
}
create = async (req, res) => {
    const userData = {nickname: req.body.nickname, password: req.body.password, email: req.body.email}

    const user = await UserService.userFind(userData.nickname)

    if (!user) {
        bcrypt.hash(req.body.password, 11, async (err, hash) => {
            userData.password = hash;
            const data = await UserService.userCreate(userData)
            if (data) {
                res.status(201).json({message: "User is successfully created"})
            } else {
                res.status(500).json({error: "Can't create object"});
            }
        })
    } else res.status(400).send({error: "User is already exists"})
}
login = async (req, res) => {
    const user = await UserService.userFind(req.body.nickname)
    if (await bcrypt.compare(req.body.password, user.password)) {

        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 300
        })

        let refreshToken = jwt.sign(user.dataValues, process.env.REFRESH_KEY, {
            expiresIn: 2592000
        })
        redis_Сlient.rpush(['UserID' + user.dataValues.id, refreshToken], function (err) {
            if (err) {
                console.log(err)
            } else {
                console.log("Token is succesfully added!")
            }
        })
        let admin = false

        if (user.roleId === 2) {
            admin = true
        }
        res.status(201).json({token, refreshToken, admin})

    } else {

        res.status(403).json({error: 'Incorrect password'})
    }
}
getNewToken = async (req, res) => {
    if (req.headers.refreshtoken) {
        const refreshToken = req.headers.refreshtoken
        const decoded = await jwt.verify(refreshToken, 'refresh_todo')

        if (Date.now < decoded.exp * 1000) {
            res.status(406).json({message: "Token is expired!"})
            redis_Сlient.lrem('UserID' + decoded.id, 0, refreshToken, function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Token is succesfully removed!")
                }
            })
        }

        redis_Сlient.lrange('UserID' + decoded.id, 0, 100, function (err, response) {
            if (response.includes(refreshToken)) {
                ['exp', 'iat'].forEach(e => delete decoded[e])
                let token = jwt.sign(decoded, process.env.SECRET_KEY, {
                    expiresIn: 300
                })
                res.status(201).json({token})
            } else {
                res.status(410).json({message: "Token is not exist in store"})
            }
        })
    } else {
        res.status(403).json({error: 'Forbidden refresh'})
    }
}
setAdmin = async (req, res) => {
    await UserService.setAdmin(req.body.roleId, req.params.id)
    res.status(201)
}
find = async (req, res) => {
    const where = {};
    if (req.query.nickname) {
        where.nickname = {[Op.substring]: req.query.nickname}
    }
    const data = await UserService.findByNickname(where)
    res.status(200).json(data);
}

logout = async (req, res) => {
    const refreshToken = req.headers.refreshtoken
    const decoded = await jwt.verify(refreshToken, 'refresh_todo')

    redis_Сlient.lrem('UserID' + decoded.id, 0, refreshToken, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Token is succesfully removed!")
        }
    })

    res.status(200).json({message: "Success"})
}


module.exports = app => {
    router.put("/userColor", auth, asyncHandler(updateColor))
    router.post("/signup", asyncHandler(create));
    router.post("/login", asyncHandler(login))
    router.put("/admin/:id", asyncHandler(setAdmin))
    router.get("/get/", asyncHandler(find))
    router.get("/token/", asyncHandler(getNewToken))
    router.get("/logout/", asyncHandler(logout))
    router.get("/userColor", auth, asyncHandler(findColor))
    app.use('/api/user', router);
};
