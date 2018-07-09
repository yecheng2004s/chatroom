var MySqlBase = function (connection, tables) {
    for (var name in tables) {
        MySqlBase.prototype[name] = new Table(tables[name], connection);
    }
};

var convertKeyValues = function (json) {
    var fields = [];
    var values = [];
    var qns = [];
    for (var name in json) {
        fields.push(name);
        values.push(json[name]);
        qns.push("?");
    }
    return { fields: fields, values: values, question: qns.join(",") };
};
var convertKeyValuePair = function (json) {
    var kv = [];
    for (var name in json) {
        kv.push(name + "=" + (typeof (json[name]) === "number" ? json[name] : ("'" + json[name] + "'")));
    }
    return kv;
};
var convertWhere = function (json) {
    var kv = convertKeyValuePair(json);
    return kv.length === 0 ? "" : (" where " + kv.join(" and "));
};

var Table = function (name, connection) {
    this.name = name;
    this.connection = connection;
};
/*
fieldKeyValues - { f1:v1, f2:v2 }
*/
Table.prototype.insert = function (fieldKeyValues) {
    var kv = convertKeyValues(fieldKeyValues);
    var sql = "insert into " + this.name + "(" + kv.fields.join(",") + ") values(" + kv.question + ")";
    return Promise.promisify(this.connection.query, { context: this.connection })(sql, kv.values);
};
/*
fieldKeyValues - { f1:v1, f2:v2 }
*/
Table.prototype.upsert = function (fieldKeyValues) {
    var kv = convertKeyValues(fieldKeyValues);
    var kvPair = convertKeyValuePair(fieldKeyValues);
    var sql = "insert into " + this.name + "(" + kv.fields.join(",") + ") values(" + kv.question + ") ON DUPLICATE KEY UPDATE " + kvPair.join(",");
    return Promise.promisify(this.connection.query, { context: this.connection })(sql, kv.values);
};
/*
where - { f1:v1, f2:v2 }
*/
Table.prototype.delete = function (where) {
    where = (null === where || void 0 === where) ? "" : convertWhere(where);
    var sql = "delete from " + this.name + where;
    return Promise.promisify(this.connection.query, { context: this.connection })(sql);
};
/*
fieldKeyValues - { f1:v1, f2:v2 }
where - { f1:v1, f2:v2 }
*/
Table.prototype.update = function (fieldKeyValues, where) {
    var kvPair = convertKeyValuePair(fieldKeyValues);
    where = (null === where || void 0 === where) ? "" : convertWhere(where);
    var sql = "update " + this.name + " set " + kvPair.join(",") + where;
    return Promise.promisify(this.connection.query, { context: this.connection })(sql);
};
/*
fields - ["f1","f2","f3"]
where - { f1:v1, f2:v2 }
*/
Table.prototype.query = function (fields, where) {
    fields = (null === fields || void 0 === fields) ? "*" : fields.join(",");
    where = (null === where || void 0 === where) ? "" : convertWhere(where);
    var sql = "select " + fields + " from " + this.name + where;
    return Promise.promisify(this.connection.query, { context: this.connection })(sql);
};

module.exports = MySqlBase;