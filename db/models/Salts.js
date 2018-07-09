var mongoose = require("mongoose");

var saltSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    salt: {
        type: String,
        unique: true
    }
});

var Salt = mongoose.model("Salt", saltSchema, "Salts");
