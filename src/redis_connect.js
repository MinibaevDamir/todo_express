const redis = require("redis");

const redis_Сlient =  redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

redis_Сlient.on_connect(() => {
    console.log('redis client connected')
});

module.exports = redis_Сlient;
