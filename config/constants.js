module.exports = {
    Error: {
        unknown: { code: "000", status: 500, message: "Unknown error" },
        exception: function (message) {
            return { code: "001", status: 500, message: message };
        },
        //business
        usernameExist: { code: "101", status: 403, message: "Username already exists" },
        emailExist: { code: "102", status: 403, message: "Email already exists" },
        invalidCaptcha: { code: "103", status: 403, message: "Captcha is invalid" },
        refreshCaptcha: { code: "104", status: 403, message: "Please refresh the captcha" },
        emailNotExist: { code: "107", status: 403, message: "Email does not exist" },
        
        unauthorized: function (message) {
            return { code: "002", status: 401, message: message };
        },
        sessionTimeout: { code: "109", status: 401, message: "session has timed out" },
        tokenExpired: { code: "110", status: 401, message: "token is expired" },
        tokenInvalid: { code: "111", status: 401, message: "token is invalid" },

        invalidPassword: { code: "105", status: 403, message: "Password is invalid" },
        usernameNotExist: { code: "106", status: 403, message: "Username already exists" },
        forgetNotAvailable: { code: "108", status: 403, message: "This hyperlink is not available" },
        nicknameNotNull: { code: "112", status: 403, message: "nickname is mandatory" },
        fileNotExist: { code: "113", status: 403, message: "File already exists" },

    },
    PageUrl: {
        s400: "shared/400",
        s401: "shared/401",
        s404: "shared/404",
        s500: "shared/500",

        reset: "login/reset",
        chat: "chat/chat",
    },
    Redis: {
        OK: "OK"
    }
};