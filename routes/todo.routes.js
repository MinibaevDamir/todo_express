const Todos = require("../controllers/todo.controller");
const router = require("express").Router();
const auth = require("../middleware/auth.middleware")
module.exports = app => {


    router.post("/", auth, Todos.create);

    router.get("/", auth, Todos.findAll)

    router.get("/get/:title&:status", auth, Todos.find)

    router.patch("/:id", auth, Todos.update);

    router.delete("/:id", auth, Todos.delete)

    app.use('/api/todo', router);
};