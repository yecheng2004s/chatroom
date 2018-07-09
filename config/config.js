var clientStatic = require("./clientStaticUrls");
var envs =
    [
        //local
        {
            domain: "http://127.0.0.1:18080/",
            mongodb: "mongodb://choky:123456@127.0.0.1:27017/chokydb",
            redis: {
                host: "127.0.0.1",
                port: "6379",
                password: "123456",
            },
            mysql: {
                log: {
                    host: "127.0.0.1",
                    port: 3306,
                    user: "root",
                    password: "123456",
                    database: "log"
                },
                chatroom: {
                    host: "127.0.0.1",
                    port: 3306,
                    user: "root",
                    password: "123456",
                    database: "chatroom"
                },
            },
        },
        //BAE
        {
            domain: "http://yecheng.duapp.com/",
            mongodb: "mongodb://31bf4gs94c243fbh6e7805yq7bc481f:b39d83r6cec545sh61acf7ui863789bd@mongo.duapp.com:8908/HTRlVqPqYLfADMogdAsJ",
            redis: {
                host: "redis.duapp.com",
                port: 80,
                password: "31bf4gs94c243fbh6e7805yq7bc481f-b39d83r6cec545sh61acf7ui863789bd-XqZTEwbMbJAfmPqVZjlp",
            },
            mysql: {
                log: {
                    host: "sqld.duapp.com",
                    port: 4050,
                    user: "31bf4gs94c243fbh6e7805yq7bc481f",
                    password: "b39d83r6cec545sh61acf7ui863789bd",
                    database: "ASMpGUmnlkTeQVMelDjR"
                },
                chatroom: {
                    host: "sqld.duapp.com",
                    port: 4050,
                    user: "31bf4gs94c243fbh6e7805yq7bc481f",
                    password: "b39d83r6cec545sh61acf7ui863789bd",
                    database: "ERNTZDyMTeOXczlFVdZE"
                },
            },
        }
    ];

var env = envs[global.environment];
var config = {
    domain: env.domain,
    mongodb: env.mongodb,
    redis: env.redis,
    mysql: env.mysql,
    express: {
        sessionSecret: "developmentSessionSecret",
        sessionCookie: { maxAge: 5 * 60 * 1000 },
        sessionStore: {
            //host: db.redis.host,
            //port: db.redis.port,
            //pass: db.redis.password,
            //db: 0,//index in redis
            ttl: 5 * 60,//seconds
            //logErrors: true
        }
    },
    tokenSecret: "developmenttokenSecret",
    tokenExp: "1h",
    tokenExpDB: 1,//hour ,same as tokenExp
    forgetHyperlinkExp: 1,//hour
    mail: {
        host: "smtp.qq.com",
        port: 465,
        from: "360259436@qq.com",
        user: "yecheng2005s",
        password: "",
    },
    logPath: "\log",
    clientScripts: clientStatic.js,
    clientStyles: clientStatic.css,
};
module.exports = config;