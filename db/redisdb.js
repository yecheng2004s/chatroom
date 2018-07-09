var config = require("../config/config");
var redis = require("redis");
var RedisModelBase = require("./base/RedisModelBase");
//var interceptor = require("./interceptor");

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

var options = {
    password: config.redis.password,
    no_ready_check: true
};
var client = redis.createClient(config.redis.port, config.redis.host, options);
client.on("error", function (error) {
    throw error;
});
//client.auth(config.redis.password);

// var select = function () {
//     //if (this.client.connected) {
//     this.client.select(this.index);
//     return Promise.resolve();
//     //} else {
//     //    return Promise.reject(new Error("connect faild."));
//     //}
// };
// for (var name in RedisModelBase.prototype) {
//     interceptor.wrapPromise("RedisModelBase.prototype." + name, { before: select });
// }

var DATABASE = {
    /*string
    key - sess:yHontGuzbez4r1a0DcbHA7rg-22qdQ_8
    value - cookie:{"originalMaxAge":6000,"expires":"","httpOnly":true,"path":"\"},token:{}
    */
    Sessions: 0,
    /*string
    userid: token
    */
    Queues: 0,
};

var DBClient = function () { };
DBClient.Sessions = new RedisModelBase(client, DATABASE.Users);
DBClient.Queues = new RedisModelBase(client, DATABASE.Queues);

DBClient.getDBIndex = function (name) {
    return DATABASE[name];
};
DBClient.getClient = function () {
    return client;
};

module.exports = DBClient;