exports.get = function (req, res) {
    //https://github.com/lemonce/svg-captcha
    var captcha = require("svg-captcha").create({
        width: 100,
        height: 34,
        noise: 3
    });//default size: 100*50
    req.session.captcha = captcha.text;
    res.set("Content-Type", "image/svg+xml");
    res.status(200);
    res.send(captcha.data);
};