var environment = {
    DEV: 0,
    BAE: 1,
};
global.environment = environment.DEV;
global.Promise = require("bluebird");
global.__approot = require("app-root-path").path;

require("./prototype");
require("./SystemError");
require("../express/initialization");

var config = require("../config/config");
var fs = require("fs");
var path = require("path");
fs.existsSync = function (path) {
    try {
        fs.accessSync(path);
    } catch (e) {
        return false;
    }
    return true;
};

//Log folder
var logPath = path.join(global.__approot, config.logPath);
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}

var cst = require("../config/constants");
var res = require("http").ServerResponse;
var url = require("../config/constants").PageUrl;
//Bad Request
res.prototype.render400 = function (msg) {
    return this.status(400).render(url.s400, { layout: false, message: msg });
};
//Unauthorized
res.prototype.render401 = function (msg) {
    return this.status(401).render(url.s401, { layout: false, message: msg });
};
//Not Found
res.prototype.render404 = function (msg) {
    return this.status(404).render(url.s404, { layout: false, message: msg });
};
//Internal Server Error
var logger = require("./logger");
res.prototype.render500 = function (e) {
    logger.err(e);
    return this.status(500).render(url.s500, {
        layout: false,
        message: e.message,
        stack: e.stack
    });
};
//{ true }
//{ }
res.prototype.success = function (data) {
    return this.status(200).json(data ? data : true);
};
//{ code: 1, message: "" }
res.prototype.failure = function (data) {
    return this.status(data.status).json({ code: data.code, message: data.message });
};
res.prototype.exception = function (e) {
    if (e instanceof Error) {
        if (e instanceof global.SystemError) {
            return this.failure(cst.Error.exception(e.message));
        }
        logger.err(e);
        return this.failure(cst.Error.exception("Internal Server Error"));
    } else {
        return this.failure(e);
    }
};