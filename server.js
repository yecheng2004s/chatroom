require("./utils/initialization");//初始化

var app = require("./express/app");
var socketio = require("./socketio");
var logger = require("./utils/logger");
//var fs = require("fs");

var PORT = 18080;

// var options = {
//     key: fs.readFileSync(__dirname + "/server-key.pem"),
//     cert: fs.readFileSync(__dirname + "/server-cert.pem")
// };

//var server = require("https").createServer(options, app.app);
var server = require("http").createServer(app.app);
socketio.listen(server);
server.listen(PORT, function () {
    logger.log("服务器已启动");
});

process.on("uncaughtException", function (err) {
    logger.err(err);
});

//mock services
require("./NodeServices/mailService");

logger.print("nodejs version : " + process.version);
