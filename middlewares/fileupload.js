var multer = require("multer");//https://github.com/expressjs/multer
var path = require("path");
//var fs = require('fs');

//base on file
// var FaceStorage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         //callback(null, __approot + "/upload/faces/");
//         var outStream = fs.createWriteStream(__approot + "/upload/faces/zq.png")

//         // file.stream.pipe(outStream);
//         // outStream.on('error', callback)
//         // outStream.on('finish', function () {
//         //     callback(null, {
//         //         path: __approot + "/upload/faces/",
//         //         size: outStream.bytesWritten
//         //     })
//         // })
//     },
//     filename: function (req, file, callback) {
//         callback(null, req.username + ".png");//req.username在auth中间件中赋值
//     }
// });
//base on memory
var FaceStorage = multer.memoryStorage();

//var upload = multer({ storage: Storage }).array("files", 3); //多文件上传，最大文件数
//var upload = multer({ dest: __approot + "/upload/" }).single("file"); //单文件上传

module.exports = function (options) {
    options = options || {};
    options.field = options.field || "file";

    return {
        face: function (req, res, next) {
            var fileExts = [".jpg", ".jpeg", ".png", ".bmp", ".tiff"];
            var upload = multer({
                storage: FaceStorage,
                fileFilter: function (req, file, cb) {
                    var ext = path.extname(file.originalname).toLowerCase();
                    if (fileExts.indexOf(ext) >= 0) {
                        cb(null, true);
                    } else {
                        //req.fileErrorMsg = "不支持该图片格式";
                        //cb(null, false);
                        cb(new global.SystemError("不支持该图片格式"));
                    }
                }
            });
            return upload.single(options.field);
        },
    };
};