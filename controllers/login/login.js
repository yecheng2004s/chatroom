var db = require("../../db/dbHelper");
var cst = require("../../config/constants");
var sha = require("sha256");
var jwt = require("../../utils/jwt");
//var config = require("../../config/config");
//var utils = require("../../utils/utils");

exports.post = function (req, res) {
    var data = {
        username: req.body.username,
        password: req.body.password,
    };

    var pUser = getUser(data.username);
    pUser.then(function (user) {
        if (user) {
            var pSalts = getSalt(user._id.toString());
            return Promise.all([pSalts, user]);
        } else {
            return Promise.reject(cst.Error.usernameNotExist);
        }
    }).spread(function (saltTable, user) {
        if (saltTable && saltTable[0]) {
            var pwHash = sha.sha256(data.password + saltTable[0].salt);
            if (pwHash == user.password) {
                var token = jwt.sign({ id: user._id.toString(), username: data.username });
                // var tokenDate = {
                //     username: data.username,
                //     token: token,
                //     expiredDate: utils.dateHoursAfter(env.tokenExpDB),
                // };
                //var pToken = setToken(user._id.toString(), token);
                return Promise.all([token, user]);
            } else {
                return Promise.reject(cst.Error.invalidPassword);
            }
        } else {
            return Promise.reject(cst.Error.invalidPassword);
        }
    }).spread(function (token, user) {
        req.session.token = token;
        req.session.user = user;
        res.success({ token: token });
    }).catch(e => res.exception(e));
};

var getUser = function (username) {
    return db.Users.findOne({ _id: 1, password: 1, username: 1, email: 1, nickname: 1 }, { username: username });
};
var getSalt = function (id) {
    return db.Salts.query(["salt"], { userid: id });
};
// var setToken = function (id, token) {
//     return db.Tokens.set(id, token, config.tokenExpDB * 60 * 60);
// };