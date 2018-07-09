var mongoose = require("mongoose");
var MongoDBModelBase = require("./base/MongoDBModelBase");
var config = require("../config/config");
var interceptor = require("./interceptor");

mongoose.Promise = Promise;

// var options = {
//     db: {
//         native_parser: true
//     },
//     server: {
//         poolSize: 5,
//         auto_reconnect: false,
//         //socketOptions: { keepAlive: 1 }
//     }
// }

// var db = mongoose.connect(config.chokydb, function (err) {
//     if (err) {
//         console.log(err);
//     }
// });
var connection = {
    connect: function () {
        if (mongoose.connection.readyState === mongoose.STATES.disconnected) {
            return new Promise(function (resolve, reject) {
                mongoose.connect(config.mongodb, function (e) {
                    return e ? reject(e) : resolve();
                });
            });
        }
    },
    disconnect: function () {
        mongoose.disconnect();
    }
};

for (var name in MongoDBModelBase.prototype) {
    interceptor.wrapPromise("MongoDBModelBase.prototype." + name, { before: connection.connect });
}

require("./models/Users");
// require('./models/Salts');
// require('./models/Tokens');
require("./models/Forget");

var Models = function () { };
Models.Users = new MongoDBModelBase(mongoose.models.User);
// Models.Salts = new MongoDBModelBase(mongoose.models.Salt);
// Models.Tokens = new MongoDBModelBase(mongoose.models.Token);
Models.Forget = new MongoDBModelBase(mongoose.models.Forget);

Models.disconnect = function () {
    mongoose.disconnect();
};

Models.getModelNames = function () {
    var names = new Array();
    for (var x in mongoose.connection.collections) {
        names.push(x);
    }
    return names;
};
Models.dropCollection = function (name) {
    mongoose.connection.collection(name).drop();
};

module.exports = Models;