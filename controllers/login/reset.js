var db = require("../../db/dbHelper");
var cst = require("../../config/constants");
var sha = require("sha256");
var utils = require("../../utils/utils");
var config = require("../../config/config");

exports.get = function (req, res) {
    var guid = req.query.guid;

    if (void 0 === guid) {
        return res.render400(cst.Error.forgetNotAvailable.message);
    }
    db.Forget.findOneAndRemove({ guid: guid }).then(function (doc) {
        if (doc) {
            if (doc.expiredDate >= new Date()) {//check guid expired
                req.session.userid = doc.userid;
                res.render(cst.PageUrl.reset, { scripts: config.clientScripts, styles: config.clientStyles });
            } else {
                res.render400(cst.Error.forgetNotAvailable.message);
            }
        } else {
            return res.render400(cst.Error.forgetNotAvailable.message);
        }
    }).catch(e => res.exception(e));
};

exports.post = function (req, res) {
    var password = req.body.password;
    var userid = req.session.userid;
    if (void 0 === userid) {
        return res.failure(cst.Error.sessionTimeout);
    }

    var salt = utils.guid();
    var pwHash = sha.sha256(password + salt);
    var pSalts = db.Salts.upsert({ userid: userid, salt: salt });
    var pUsers = db.Users.update({ password: pwHash }, { _id: userid });
    Promise.all([pSalts, pUsers]).spread(function (r, user) {
        if (user.ok === 1) {
            return res.success();
        } else {
            return res.failure(cst.Error.unknown);
        }
    }).catch(e => res.exception(e));
};