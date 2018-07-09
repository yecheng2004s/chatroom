var MongoDBModelBase = require("./base/MongoDBModelBase");
var RedisModelBase = require("./base/RedisModelBase");

exports.intercept = function (name, fns) {
    var orign = eval(name);
    var func = function () {
        for (var i in fns)
            if (!fns[i].apply(this, arguments))
                break;
        return orign.apply(this, arguments);
    };
    eval(name + " = func;");
};

exports.wrap = function (name, fn) {
    var orign = eval(name);
    var func = function () {
        if (fn.before)
            fn.before.apply(this, arguments);
        var r = orign.apply(this, arguments);
        if (fn.after)
            fn.after.apply(this, arguments);
        return r;
    };
    eval(name + " = func;");
};

exports.wrapPromise = function (name, fn) {
    var orign = eval(name);
    var func = function () {
        var bf = void 0;
        if (fn.before)
            bf = fn.before.apply(this, arguments);
        var r = orign.apply(this, arguments);
        if (fn.after)
            fn.after.apply(this, arguments);

        return new Promise(function (resolve, reject) {
            if (bf instanceof Promise) {
                bf.then(function () {
                    return resolve(r);
                }).catch(function (e) {
                    return reject(e);
                });
            } else {
                return resolve(r);
            }
        });
    };
    //orign = func;
    eval(name + " = func;");
};