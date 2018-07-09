angular.module("config", [])
    .constant("URL", {
        CAPTCHA: "/api/captcha.jpg",
        REGISTER: "/api/register",
        LOGIN: "/api/login",
        FIND: "/api/find",
        RESET: "/api/reset",
    });
