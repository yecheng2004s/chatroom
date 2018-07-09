var db = require("../../db/dbHelper");
var error = require("../../config/constants").Error;
var jwt = require("../../utils/jwt");
//var config = require("../../config/config");
var sha = require("sha256");
var utils = require("../../utils/utils");

exports.post = function (req, res) {
    var data = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        nickname: req.body.username,
    };
    if (void 0 === req.session.captcha) {
        res.failure(error.refreshCaptcha);
        return;
    }
    var captcha = req.body.captcha;
    if (captcha.toLowerCase() != req.session.captcha.toLowerCase()) {
        res.failure(error.invalidCaptcha);
        return;
    }
    db.Users.findOne({ _id: 1, username: 1, password: 1, email: 1 }, { $or: [{ username: data.username }, { email: data.email }] })
        .then(function (doc) {
            if (doc) {
                if (doc.username == data.username) {
                    return Promise.reject(error.usernameExist);
                } else if (doc.email == data.email) {
                    return Promise.reject(error.emailExist);
                } else {
                    return Promise.reject(error.unknown);
                }
            } else {
                var salt = utils.guid();
                data.password = sha.sha256(data.password + salt);
                var pUser = db.Users.insert(data);

                return Promise.all([pUser, salt]);
            }
        }).spread(function (user, salt) {
            var pSalt = db.Salts.insert({ userid: user._id.toString(), salt: salt });
            var token = jwt.sign({ id: user._id.toString(), username: data.username });
            // var tokenDate = {
            //     username: data.username,
            //     token: token,
            //     expiredDate: utils.dateHoursAfter(env.tokenExpDB),
            // };
            // var pToken = db.Tokens.insert(tokenDate);
            //var pToken = db.Tokens.set(user._id.toString(), token, config.tokenExpDB * 60 * 60);

            return Promise.all([pSalt, token, user]);
        }).spread(function (salt, token, user) {
            createFace(user.username);
            req.session.token = token;
            req.session.user = user;
            res.json({ token: token });
        }).catch(e => res.exception(e));
};

var createFace = function (username) {
    var fs = require("fs");
    var path = require("path");

    var src = path.join(global.__approot, "client/face.PNG");
    var dst = path.join(global.__approot, "upload/faces/" + username + ".PNG");
    //return Promise.promisify(fs.copyFile, { context: fs })(src, des);
    if (fs.existsSync(src)) {
        var rs = fs.createReadStream(src);
        var wr = fs.createWriteStream(dst);
        rs.pipe(wr);
    }
};