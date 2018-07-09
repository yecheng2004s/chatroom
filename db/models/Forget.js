var mongoose = require("mongoose");
var config = require("../../config/config");

var forgetSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true
    },
    guid: {
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

//forgetSchema.set("toObject", { getters: true });
forgetSchema.set("toJSON", { getters: true });
var Foget = mongoose.model("Forget", forgetSchema, "Forget");

// getter方式二
// forgetSchema.options.toObject = forgetSchema.options.toJSON = {
//     transform: function (doc, ret, options) {
//         ret.date = ret.date.toEast8();
//         return ret;
//     }
// }