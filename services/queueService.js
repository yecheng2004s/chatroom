var db = require("../db/dbHelper");

var queueType = { Mail: "q:mail" };

module.exports = {
    MAIL: queueType.Mail,
    addTask: function (type, data) {
        db.Queues.rpush(type, JSON.stringify(data));
    },
    addMailTask: function (data) {
        this.addTask(this.MAIL, data);
    },
};
