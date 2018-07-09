var db = require("../db/dbHelper");
var logger = require("../utils/logger");

var KEY = "q:mail";

setInterval(function () {
    db.Queues.lpop(KEY).then(function (data) {
        if (data) {
            data = JSON.parse(data);
            require("../utils/email").send(data.to, data.subject, data.body);
        }
    }).catch(function (e) {
        logger.err(e);
    });
}, 1000);