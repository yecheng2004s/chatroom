var envs = [
    //local
    {
        js: [
            "libraries/cdn.bootcss.com/jquery/1.12.1/jquery.js",
            "libraries/cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.js",
            "libraries/cdn.bootcss.com/angular.js/1.6.4/angular.js",
            "libraries/cdn.bootcss.com/angular.js/1.6.4/angular-animate.js",
            "libraries/cdn.bootcss.com/angular-ui-router/1.0.3/angular-ui-router.js",
            "libraries/cdn.bootcss.com/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.js",//https://angular-ui.github.io/bootstrap/
            "libraries/cdn.bootcss.com/ngStorage/0.3.11/ngStorage.js",//https://github.com/gsklee/ngStorage
            "libraries/cdn.bootcss.com/spin/1.2.7/spin.min.js",//https://github.com/fgnass/spin.js
            "libraries/js/sha256.js",//https://github.com/cryptocoinjs/sha256
            "libraries/angular-promise-buttons/angular-promise-buttons.min.js",//https://github.com/johannesjo/angular-promise-buttons
            "libraries/ui-uploader/uploader.min.js",//https://github.com/angular-ui/ui-uploader
            "libraries/angular-loading/angular-loading.min.js",//https://github.com/darthwade/angular-loading
            "js/prototype.js",
            "utilities/utilities.js",
            "configs/constants.js",
            "common/components/popup/popup.js",
        ],
        css: [
            "libraries/cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.css",
            "libraries/cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.css",
            "libraries/angular-promise-buttons/angular-promise-buttons.css",
            "libraries/angular-loading/angular-loading.css",
            "styles/app.css",
            "styles/login.css",
        ]
    },
    //online
    {
        js: [
            "https://cdn.bootcss.com/jquery/1.12.1/jquery.min.js",
            "https://cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js",
            "https://cdn.bootcss.com/angular.js/1.6.4/angular.min.js",
            "https://cdn.bootcss.com/angular.js/1.6.4/angular-animate.min.js",
            "https://cdn.bootcss.com/angular-ui-router/1.0.3/angular-ui-router.min.js",
            "https://cdn.bootcss.com/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min.js",//https://angular-ui.github.io/bootstrap/
            "https://cdn.bootcss.com/ngStorage/0.3.11/ngStorage.min.js",//https://github.com/gsklee/ngStorage
            "https://cdn.bootcss.com/spin.js/1.2.7/spin.min.js",//https://github.com/fgnass/spin.js
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/js/sha256.min.js",//https://github.com/cryptocoinjs/sha256
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/js/angular-promise-buttons.min.js",//https://github.com/johannesjo/angular-promise-buttons
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/js/uploader.min.js",//https://github.com/angular-ui/ui-uploader
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/js/angular-loading.min.js",//https://github.com/darthwade/angular-loading
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/js/bundle-1.0.min.js",
        ],
        css: [
            "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css",
            "https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap-theme.min.css",
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/css/angular-promise-buttons.css",
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/css/angular-loading.css",
            "http://yecheng-duapp.oss-cn-hangzhou.aliyuncs.com/css/bundle-1.0.min.css",
        ]
    }
];

var env = envs[global.environment];
module.exports = { js: env.js, css: env.css };