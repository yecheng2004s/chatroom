var jwt = require("jsonwebtoken");//https://github.com/auth0/node-jsonwebtoken
var config = require("../config/config");

exports.sign = function (payload) {
    return jwt.sign(payload, config.tokenSecret, { expiresIn: config.tokenExp });
};

exports.verify = function (token, callback) {
    return jwt.verify(token, config.tokenSecret, callback);
};