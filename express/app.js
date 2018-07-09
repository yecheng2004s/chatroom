var path = require("path");
var express = require("express");
var partials = require("express-partials");
var compression = require("compression");
var utils = require("../utils/utils");
var routes = require("./routes");
var configs = require("./configs");
var config = require("../config/config");
var logger = require("../utils/logger");
var dbHelper = require("../db/dbHelper");

var app = express();
configs.config(app);

// var compressFilter = function (req, res) {
//     if (req.headers["accept"]) {
//         if (req.headers["accept"].indexOf("text/html") >= 0
//             || req.headers["accept"].indexOf("application/json") >= 0) {
//             return compression.filter(req, res);
//         }
//     }

//     // don't compress responses with this request header
//     return false;
// };//https://github.com/expressjs/compression
app.use(compression());//gzip/deflate压缩
app.use(partials()); //母版页功能

var options = {
    dotfiles: "ignore",
    etag: false,
    extensions: ["htm", "html", "css", "js", "jpg", "woff2"],
    index: false,
    maxAge: "1d",
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set("x-timestamp", Date.now());
    }
};//http://www.expressjs.com.cn/guide/using-middleware.html
app.use(express.static(path.join(__dirname, "../client"), options));
app.use(express.static(path.join(__dirname, "../upload")));

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//https://github.com/expressjs/session
var session = require("express-session");
var RedisStrore = require("connect-redis")(session);//https://github.com/tj/connect-redis
app.use(session({
    // genid: function (req) {
    //     return req.id;
    // },
    store: new RedisStrore({
        client: dbHelper.RedisDB.getClient(),//使用一个已有的连接
        ttl: config.express.sessionStore.ttl
    }),
    secret: config.express.sessionSecret,
    resave: false,//每次请求都重新设置session cookie
    saveUninitialized: false,//
    rolling: true,//当有请求自动延长session
    cookie: config.express.sessionCookie//单位毫秒，过了该时间后过期
}));

//路由需在中间件之后加载
app.use("/", routes);

//500异常
app.use(function (err, req, res, next) {
    logger.err(err);
    if (utils.isAjaxRequest(req)) {
        res.exception(err);
    } else {
        res.render500(err);
    }
});
//404异常
app.use(function (req, res, next) {
    logger.print("404 异常");
    res.render404();
});

exports.app = app;