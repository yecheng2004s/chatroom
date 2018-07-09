var util = require("util");
global.SystemError = function (message) {
    Object.defineProperty(this, "message", {
        value: message,
        configurable: true,
        writable: true
    });
    Error.captureStackTrace(this, global.SystemError);
};
util.inherits(global.SystemError, Error);