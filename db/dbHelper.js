var mongodb = require("./mongodb");
var redisdb = require("./redisdb");
var mysql = require("./mysql");

var db = function () { };
db.Users = mongodb.Users;
db.Forget = mongodb.Forget;

db.Sessions = redisdb.Sessions;
db.Queues = redisdb.Queues;

db.Salts = mysql.Chatroom.Salts;
//db.Errors = mysql.Log.Errors;
//db.Logs = mysql.Log.Logs;

db.MongoDB = {
    disconnect: mongodb.disconnect,
    getModelNames: mongodb.getModelNames,
    dropCollection: mongodb.dropCollection,
};

db.RedisDB = {
    getDBIndex: redisdb.getDBIndex,
    getClient: redisdb.getClient,
};

module.exports = db;