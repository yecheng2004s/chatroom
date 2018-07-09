var ModelBase = function (client, index) {
    this.client = client;
    this.index = index;
};
//Keys
ModelBase.prototype.del = function (key) {
    return this.client.delAsync(key);
};
// ModelBase.prototype.keys = function () {
//     return this.client.keysAsync("*");
// }
//Strings
ModelBase.prototype.get = function (key) {
    return this.client.getAsync(key);
};
ModelBase.prototype.getAndDel = function (key) {
    return this.client.multi().get(key).del(key).execAsync();
};
ModelBase.prototype.getAndTtl = function (key) {
    return this.client.multi().get(key).ttl(key).execAsync();
};
ModelBase.prototype.set = function (key, value, seconds) {
    if (seconds) {
        return this.client.multi().set(key, value).expire(key, seconds).execAsync();
    } else {
        return this.client.setAsync(key, value);
    }
};
//Hash
ModelBase.prototype.hget = function (key, field) {
    return this.client.hgetAsync(key, field);
};
ModelBase.prototype.hmget = function (key, array) {
    return this.client.hmgetAsync(key, array);
};
ModelBase.prototype.hgetall = function (key) {
    return this.client.hgetallAsync(key);
};
ModelBase.prototype.hset = function (key, field, value, seconds) {
    if (seconds) {
        return this.client.multi().hset(key, field, value).expire(key, seconds).execAsync();
    } else {
        return this.client.hsetAsync(key, field, value);
    }
};
ModelBase.prototype.hmset = function (key, json, seconds) {
    if (seconds) {
        return this.client.multi().hmset(key, json).expire(key, seconds).execAsync();
    } else {
        return this.client.hmsetAsync(key, json);
    }
};
//Lists
ModelBase.prototype.rpush = function (key, value) {
    return this.client.rpushAsync(key, value);
};
ModelBase.prototype.lpop = function (key) {
    return this.client.lpopAsync(key);
};
//Sets
ModelBase.prototype.sadd = function (key, value) {
    return this.client.saddAsync(key, value);
};

module.exports = ModelBase;