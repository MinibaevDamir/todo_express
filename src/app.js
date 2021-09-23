const express = require('express')
const cors = require("cors");
const os = require('os');
const cluster = require('cluster');
const app = express();
const redis = require('redis')
// const httpServer = require('http').createServer(app)
const sls = require('serverless-http')


app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors());

// const io = require('socket.io')(httpServer, {
//     cors: {
//         origin: "*", methods: ["GET", "POST"],
//         transports: ['websocket', 'polling'],
//         credentials: true
//     },
//     allowEIO3: true
// });

app.use((req, res, next) => {
    if (cluster.isWorker)
        console.log(`Worker ${cluster.worker.id} handle request`);
    next();
})

require("./controllers/todo.controller")(app);
require("./controllers/user.controller")(app);
const PORT = process.env.PORT || 5000;


// if (cluster.isMaster) {
//     let cpus = os.cpus().length;
//     for (let i = 0; i < cpus; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code) => {
//         console.log(`Worker ${worker.id} finished. Exit code: ${code}`)
//     })
// } 
// else {
//     const sub = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)
    // io.on("connect",  (client) => {
    //     sub.subscribe('messageChannel')
    //     client.join('messageRoom')
    //     sub.on('message', (channel, dataRaw) => {
    //         const data = JSON.parse(dataRaw)
    //         client.to('messageRoom').emit('sendNotification', `Todo ${data} was updated by owner`)
    //     })
    //     client.on('disconnect', function () {
    //         sub.unsubscribe('messageChannel');
    //         client.leave('messageRoom');
    //     });

    // })
    // app.listen(PORT, '', () => {
    //     console.log(`Worker ${cluster.worker.id} launched`)
    // })   
    // }
// app.listen(PORT)
module.exports.handler = sls(app)