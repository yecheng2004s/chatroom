/*
run under mongo
*/
var conn = new Mongo();
var db = conn.getDB("chokydb");
db.auth("choky", "123456");

print("============== drop all collections ==============");
var names = db.getCollectionNames();
for (var i = 0; i < names.length; i++) {
    db[names[i]].drop();
}
// var cursor = db.getCollectionNames();
// while(cursor.hasNext()) {
//     r = cursor.next();
//     print(r);
// }

print("============== create collections ==============");
db.createCollection("Users");
db.Users.ensureIndex({ username: 1 }, { unique: true });
db.Users.ensureIndex({ email: 1 }, { unique: true });

// db.createCollection("Salts");
// db.Salts.ensureIndex({ username: 1 }, { unique: true });
// db.Salts.ensureIndex({ salt: 1 }, { unique: true });

// db.createCollection("Tokens");
// db.Tokens.ensureIndex({ username: 1 }, { unique: true });
// db.Tokens.ensureIndex({ token: 1 }, { unique: true });
// db.Tokens.ensureIndex({ expiredDate: 1 }, { expireAfterSeconds: 60 * 10 });

db.createCollection("Forget");
db.Forget.ensureIndex({ userid: 1 }, { unique: true });
db.Forget.ensureIndex({ guid: 1 }, { unique: true });
db.Forget.ensureIndex({ expiredDate: 1 }, { expireAfterSeconds: 60 * 10 });

print("============== finish ==============");