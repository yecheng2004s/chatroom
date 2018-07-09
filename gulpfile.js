var gulp = require("gulp");
var clean = require("gulp-clean");
var mincss = require("gulp-mini-css");//压缩css
var uglify = require("gulp-uglify");//压缩js
var concat = require("gulp-concat");//合并
//var sourcemaps = require("gulp-sourcemaps");//生成用于调试的map

var jsbundle = "./client/libraries/bundle/";
var cssbundle = "./client/styles/bundle/";

gulp.task("clean", function () {
    return gulp.src([jsbundle + "*.js", cssbundle + "*.css"])
        .pipe(clean());
});

gulp.task("scripts", function () {
    return gulp.src([
        "./client/js/prototype.js",
        "./client/utilities/utilities.js",
        "./client/configs/constants.js",
        "./client/common/components/popup/popup.js",
    ])
        //.pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat("bundle-1.0.min.js"))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(jsbundle));
});

gulp.task("styles", function () {
    return gulp.src([
        "./client/styles/app.css",
        "./client/styles/login.css",
    ])
        .pipe(mincss())
        .pipe(concat("bundle-1.0.min.css"))
        .pipe(gulp.dest(cssbundle));
});

//gulp.task("watch", function () {
//    gulp.watch(src_js+"/**/*.js",["scripts"]);
//    gulp.watch(src_css+"/**/*.css",["styles"]);
//});

gulp.task("default", ["clean"], function () {
    gulp.start("scripts", "styles");
});