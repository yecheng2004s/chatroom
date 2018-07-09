var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        //自定义验证器，保存时验证
        // validate: [
        //     function (value) {
        //         return value.length >= 6;
        //     },
        //     "password must be at least 6 characters"
        // ]
    },
    email: {
        type: String,
        unique: true
    },
    nickname: {
        type: String,
        default: ""
    }
});

var User = mongoose.model("User", userSchema, "Users");
