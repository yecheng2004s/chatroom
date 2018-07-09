var path = require("path");
var ejs = require("ejs");

exports.config = function (app) {
    app.set("views", path.join(__dirname, "../views"));
    app.engine(".html", ejs.__express);
    app.set("view engine", "html");
    //app.set('view options', { defaultLayout: "layout" });
};
