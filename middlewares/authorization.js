var utils = require("../utils/utils");
var jwt = require("../utils/jwt");
//var db = require("../db/dbHelper");
var error = require("../config/constants").Error;

var preventResponse = function (req, res, e) {
    if (utils.isAjaxRequest(req))
        return res.exception(e);
    else
        return eval("res.render" + e.status + "(\"" + e.message + "\")");//render500
};

module.exports = function (req, res, next) {
    var token = req.session.token || req.query.token;
    if (void 0 === token) {
        return preventResponse(req, res, error.sessionTimeout);
    }
    jwt.verify(token, function (err, decoded) {
        if (err) {
            return preventResponse(req, res, error.unauthorized(err.message));
        }
        else {
            if (utils.nowFromUnixTimestamp(decoded.exp) >= new Date()) {
                req.id = decoded.id;
                req.username = decoded.username;
                return next();
                // db.Tokens.get(decoded.id).then(function (r) {
                //     if (r === token) {
                //         req.id = decoded.id;
                //         req.username = decoded.username;
                //         return next();
                //     } else {
                //         return blockResponse(req, res, error.tokenInvalid);
                //     }
                // }).catch(function (e) {
                //     return blockResponse(req, res, e);
                // });
            } else {
                return preventResponse(req, res, error.tokenExpired);
            }
        }
    });
};