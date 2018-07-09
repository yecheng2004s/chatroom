var mongoose = require("mongoose");
var config = require("../../config/config");

var tokenSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    token: {
        type: String,
        unique: true
    },
    expiredDate: {
        type: Date,
        index: { expires: config.tokenExp },
        get: function (value) {
            //return value.toEast8();
            return value;
        }
    },
});

//tokenSchema.set("toObject", { getters: true });
tokenSchema.set("toJSON", { getters: true });
var Token = mongoose.model("Token", tokenSchema, "Tokens");
