//var db = require("../db/dbHelper");
var fs = require("fs");
var config = require("../config/config");
var path = require("path");

function log(msg, file) {
    fs.writeFileSync(path.join(global.__approot, config.logPath, file), (new Date().format("yyyy-MM-dd HH:mm:ss")) + " - " + msg + "\r\n\r\n", { flag: "a+" });
}

function info(msg) {
    log(msg, "info_" + (new Date().format("yyyyMMdd")) + ".log");
}

function error(e) {
    if (e instanceof Error) {
        log(e.message + "\r\n" + e.stack, "error_" + (new Date().format("yyyyMMdd")) + ".log");
    } else {
        log(e, "error_" + (new Date().format("yyyyMMdd")) + ".log");
    }
}

exports.print = function (log) {
    console.log(new Date().toLocaleString() + "：" + log);
};

exports.err = function (e) {
    this.print(e.message);
    //db.Log.Errors.insert({ message: e.message, stack: e.stack });
    error(e);
};

exports.log = function (msg) {
    this.print(msg);
    //db.Log.Logs.insert({ message: msg });
    info(msg);
};