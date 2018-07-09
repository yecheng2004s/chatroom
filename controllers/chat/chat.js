var url = require("../../config/constants").PageUrl;
var db = require("../../db/dbHelper");
var config = require("../../config/config");

exports.get = function (req, res) {
    //res.setHeader("Set-Cookie", ["myCookie=test"]);//just for test
    var pUser = db.Users.findById({}, req.id);
    return pUser.then(function (user) {
        return res.render(url.chat, {
            username: req.username,
            nickname: user.nickname,
            scripts: config.clientScripts,
            styles: config.clientStyles
        });
    }).catch(e => res.exception(e));
};