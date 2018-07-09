var logger = require("../utils/logger");
var express = require("express");
var midAuth = require("../middlewares/authorization");
var fileupload = require("../middlewares/fileupload")();
var config = require("../config/config");

var router = express.Router();

router.get("/", express.renderWithLayout("login/app", { scripts: config.clientScripts, styles: config.clientStyles }));
router.get("/login/login", express.render("login/login"));
router.get("/login/find", express.render("login/find"));
router.get("/login/register", express.render("login/register"));
router.get("/login/reset", require("../controllers/login/reset").get);
router.get("/logout", function (req, res) {
  req.session.destroy(function (err) {
    if (err)
      logger.err(err);
  });
  res.redirect("/");
});

router.get("/chat/chat", midAuth, require("../controllers/chat/chat").get);
router.get("/chat/settings", midAuth, express.render("chat/settings"));
router.post("/api/upload_face", midAuth, fileupload.face(), require("../controllers/chat/settings").upload);
router.post("/chat/settings", midAuth, require("../controllers/chat/settings").post);

//ajax call
router.get("/api/captcha.jpg", require("../controllers/login/captcha").get);
router.post("/api/register", require("../controllers/login/register").post);
router.post("/api/login", require("../controllers/login/login").post);
router.post("/api/find", require("../controllers/login/find").post);
router.post("/api/reset", require("../controllers/login/reset").post);

module.exports = router;