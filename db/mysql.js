var mysql = require("mysql");
var config = require("../config/config");
var MySqlBase = require("./base/MySqlBase");

// var options_log = {
//     host: config.mysql.log.host,
//     port: config.mysql.log.port,
//     user: config.mysql.log.user,
//     password: config.mysql.log.password,
//     database: config.mysql.log.database
// };
var options_chatroom = {
    // connectionLimit : 1000,
    // connectTimeout  : 60 * 60 * 1000,
    // aquireTimeout   : 60 * 60 * 1000,
    // timeout         : 60 * 60 * 1000,
    host: config.mysql.chatroom.host,
    port: config.mysql.chatroom.port,
    user: config.mysql.chatroom.user,
    password: config.mysql.chatroom.password,
    database: config.mysql.chatroom.database
};
//var connectionLog = mysql.createConnection(options_log);
//var connectionLog = mysql.createPool(options_log);
var connectionChatroom = mysql.createPool(options_chatroom);

connectionChatroom.on("error", function (err) {
    if (err.errno != "ECONNRESET") {
        throw err;
    } else {
        //do nothing
    }
});

var db = function () { };
//db.Log = new MySqlBase(connectionLog, { Errors: "errors", Logs: "logs" });
db.Chatroom = new MySqlBase(connectionChatroom, { Salts: "salts" });

module.exports = db;