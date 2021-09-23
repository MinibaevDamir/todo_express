const {Op} = require("sequelize");
const asyncHandler = require("express-async-handler")
const router = require("express").Router();
const auth = require("../middleware/auth.middleware")
const TodoService = require('../services/todo.service')
const redis = require('redis')
const mysql = require("mysql2");
const stringify = require("csv-stringify");
const stream = require("stream");
const stringifier = stringify();


dataFilter = (arr) => {
    let comparer = function compareObject(a, b) {
        if (a.title == b.title) {
            if (a.artist < b.artist) {
                return -1;
            } else if (a.artist > b.artist) {
                return 1;
            } else {
                return 0;
            }
        } else {
            if (a.title < b.title) {
                return -1;
            } else {
                return 1;
            }
        }
    }
    let checker;
    let uniqueResults = [];
    for (let i = 0; i < arr.length; ++i) {
        if (!checker || comparer(checker, arr[i]) != 0) {
            checker = arr[i];
            uniqueResults.push(checker);
        }
    }
    return uniqueResults;
}



const msq = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Asad2001g_',
    database: 'tododb'
});

async function create(req, res) {
    let userId
    if (req.body.user) {
        userId = req.body.user.id
    } else {
        userId = req.user.id
    }

    const todo = {title: req.body.todo.title, status: req.body.todo.status}

    await TodoService.todoCreate(todo, userId)

    res.status(200).json("Todo successfully created");
}

find = async (req, res) => {
    
    const where = {};

    let username = ""
    console.log(req.query.status)
    if (req.query.username) {
        username = req.query.username
    }
    if (req.query.title) {
        where.title = {[Op.substring]: req.query.title}
    }
    if (req.query.status) {
        where.status = JSON.parse(req.query.status)
    }
    const data = await TodoService.todoFind(req.user.id, username, where)
    res.status(200).json(data);
}

multipleFind = async(req, res) => {
    const data = await TodoService.todoMultipleFind(req.query.ids)
    res.status(200).json(dataFilter(data));
}





getLatestCompleted = async(req, res) => {
    const where = {};
    where.status = JSON.parse(req.query.status)
    let username = req.user.nickname
    if (req.query.username && req.query.username !== "") {
        username = req.query.username
    }
    const data = await TodoService.todoFindWithCompleted(req.user.id, username, where)
    res.status(200).json(data)
}
getCount = async (req, res) => {
    let username = req.user.nickname
    if (req.query.username && req.query.username !== "") {
        username = req.query.username
    }
    const data = await TodoService.todoFind(req.user.id, username)
    let complete = data.filter(todo => todo.status === true).length
    let inProgress = data.filter(todo => todo.status === false).length

    res.status(200).json({complete, inProgress});

}
getMultipleCount = async (req, res) => {
    const data = await TodoService.todoMultipleFind(req.query.ids)
    let temp = dataFilter(data)
    let complete = temp.filter(todo => todo.status === true).length
    let inProgress = temp.filter(todo => todo.status === false).length

    res.status(200).json({complete, inProgress});

}
deletes = async (req, res) => {
    await TodoService.todoDestroy(req.params.id)
    res.status(200)
}

update = async (req, res) => {
    const pub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
    await TodoService.todoUpdate(req.body.info, req.params.id)
    if(req.user.roleId !== 2) {
        pub.publish('messageChannel', JSON.stringify(req.params.id))
    }
    res.status(200).json({message: "Todo was updated successfully."});
}

loadDb = async (req, res) => {
    res.setHeader('Content-type', 'application/csv');
    res.setHeader('Content-disposition', 'attachment; filename=tododb.csv')
    msq.connect()
    msq.query('SELECT * FROM Todos')
        .stream({highWaterMark: 5})
        .pipe(stringifier)
        .pipe(new stream.Transform({
            transform(chunk, encoding, callback) {
                let newChunk = chunk.toString().split(',')
                console.log(newChunk)
                newChunk = newChunk.join(',')
                this.push(newChunk);
                callback()
            }
        }))
        .pipe(res)
        .on('finish', msq.end)
}

module.exports = app => {
    router.post("/", auth, asyncHandler(create));

    router.get("/getmulti", auth, asyncHandler(multipleFind))

    router.get("/getlatest", auth, asyncHandler(getLatestCompleted))

    router.get("/getmultiplecount", auth, asyncHandler(getMultipleCount))

    router.get("/getcount", auth, asyncHandler(getCount))

    router.get("/get", auth, asyncHandler(find));

    router.patch("/:id", auth, asyncHandler(update));

    router.delete("/:id", auth, asyncHandler(deletes));

    router.get("/download", auth, asyncHandler(loadDb));

    app.use('/api/todo', router);
}
