var config = require("../config/config");

var nodemailerSend = function (to, subject, body) {
    var nodemailer = require("nodemailer");//https://github.com/nodemailer/nodemailer
    var mail = nodemailer.createTransport({
        host: config.mail.host,
        secureConnection: true,
        port: config.mail.port,
        auth: {
            user: config.mail.user,
            pass: config.mail.password
        }
    });
    var from = config.mail.from;
    return Promise.promisify(mail.sendMail, { context: mail })({
        from: from,
        to: to,
        subject: subject,
        html: body
    });
};

var emailjsSend = function (to, subject, body) {
    var emailjs = require("emailjs");//https://github.com/eleith/emailjs
    var server = emailjs.server.connect({
        user: config.mail.user,
        password: config.mail.password,
        host: config.mail.host,
        port: config.mail.port,
        ssl: true
    });

    var message = {
        //text: body,
        from: config.mail.from,
        to: to,
        subject: subject,
        attachment:
        [
            { data: body, alternative: true },
        ]
    };

    return Promise.promisify(server.send, { context: server })(message);
};

exports.send = function (to, subject, body) {
    var version = process.versions.node;
    var v = parseInt(version.substring(0, version.indexOf(".")));
    if (v >= 6) {
        nodemailerSend(to, subject, body);
    } else {
        emailjsSend(to, subject, body);
    }
};