var images = require("images");
var cst = require("../../config/constants");
var db = require("../../db/dbHelper");

exports.upload = function (req, res) {
    if (!req.file) {
        return res.exception(new global.SystemError("上传失败"));
    }

    try {
        var pngBuffer = images(req.file.buffer).size(40, 40).encode("png");
        images(pngBuffer).save(global.__approot + "/upload/faces/" + req.username + ".png");
    } catch (e) {
        return res.exception(e);
    }

    return res.success();
};

exports.post = function (req, res) {
    var username = req.username;
    var nickname = req.body.nickname;
    if (nickname) {
        db.Users.update({ nickname: nickname }, { username: username })
            .then(function (r) {
                if (r.ok === 1) {
                    return res.success();
                } else {
                    return res.failure(cst.Error.unknown);
                }
            }).catch(e => res.exception(e));
    } else {
        return res.failure(cst.Error.nicknameNotNull);
    }
};