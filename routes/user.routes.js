const Users = require("../controllers/user.controller");
const router = require("express").Router();

module.exports = app => {
    router.post("/signup", Users.create);
    router.post("/login", Users.login);
    app.use('/api/user', router);
};