exports.guid = function () {
    var format = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
    return format.replace(/[x]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });//.toUpperCase();
};

exports.toBase64 = function (str) {
    var b = new Buffer(str);
    return b.toString("base64");
};

exports.fromBase64 = function (base64) {
    var b = new Buffer(base64, "base64");
    return b.toString();
};

exports.unixNow = function () {
    return Date.now() / 1000;
};

exports.nowFromUnixTimestamp = function (unixTimestamp) {
    return new Date(unixTimestamp * 1000);
};

exports.unixSecondsAfter = function (seconds) {
    return this.unixNow() + seconds;
};
exports.dateSecondsAfter = function (seconds) {
    return new Date(Date.now() + seconds * 1000);
};
exports.unixMinutesAfter = function (minutes) {
    return this.unixNow() + minutes * 60;
};
exports.dateMinutesAfter = function (minutes) {
    return new Date(Date.now() + minutes * 60 * 1000);
};
exports.unixHoursAfter = function (hours) {
    return this.unixNow() + hours * 60 * 60;
};
exports.dateHoursAfter = function (hours) {
    return new Date(Date.now() + hours * 60 * 60 * 1000);
};
exports.unixDaysAfter = function (days) {
    return this.unixNow() + days * 60 * 60 * 24;
};
exports.dateDaysAfter = function (days) {
    return new Date(Date.now() + days * 60 * 60 * 24 * 1000);
};

exports.isAjaxRequest = function (req) {
    return req.headers["x-requested-with"] && req.headers["x-requested-with"].toLowerCase() === "xmlhttprequest";
};