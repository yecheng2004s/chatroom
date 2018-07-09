var db = require("../../db/dbHelper");
var cst = require("../../config/constants");
var config = require("../../config/config");
var url = require("url");
var utils = require("../../utils/utils");

exports.post = function (req, res) {
    var email = req.body.email;
    db.Users.findOne({ _id: 1, username: 1, email: 1 }, { email: email })
        .then(function (user) {
            if (user) {
                var guid = utils.guid();
                var forget = { userid: user._id, guid: guid, expiredDate: utils.dateHoursAfter(config.forgetHyperlinkExp) };
                var pForget = db.Forget.upsert(forget, { userid: user._id });
                var pData = { email: user.email, guid: guid };
                return Promise.all([pForget, pData]);
            } else {
                return Promise.reject(cst.Error.emailNotExist);
            }
        }).spread(function (forget, data) {
            var hyperlink = url.resolve(config.domain, "/login/reset?guid=" + data.guid);
            require("../../services/serviceManager").Queue.addMailTask({ to: data.email, subject: "Reset Password", body: hyperlink });
            return res.success();
        }).catch(e => res.exception(e));
};