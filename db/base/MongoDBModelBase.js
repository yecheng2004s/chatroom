var ModelBase = function (model) {
    this.Model = model;
};

// var checkVersionAndAppend = function (update) {
//     update.$setOnInsert = { __v: 0 };
//     if (update.__v === undefined) {
//         if (!update.$inc) {
//             update.$inc = { __v: 1 };
//         } else if (!update.$inc.__v) {
//             update.$inc.__v = 1;
//         }
//     }
// };

ModelBase.prototype.insert = function (data) {
    var model = new this.Model(data);
    return model.save();
};
/*
safe (boolean) safe mode (defaults to value set in schema (true))
upsert (boolean) whether to create the doc if it doesn't match (false)
multi (boolean) whether multiple documents should be updated (false)
strict (boolean) overrides the strict option for this update
overwrite (boolean) disables update-only mode, allowing you to overwrite the doc (false)
*/
//affect all records
ModelBase.prototype.update = function (update, where) {
    //checkVersionAndAppend(update);
    return this.Model.update(where, update, { runValidators: true, multi: true });
};
//affect only one record
ModelBase.prototype.replace = function (update, where) {
    //checkVersionAndAppend(update);
    return this.Model.update(where, update, { runValidators: true, overwrite: true });
};
//affect all records
ModelBase.prototype.upsert = function (update, where) {
    //checkVersionAndAppend(update);
    return this.Model.update(where, update, { runValidators: true, multi: true, upsert: true });
};
//affect all records
ModelBase.prototype.remove = function (where) {
    return this.Model.remove(where);
};
//{_id:1},{_id:xxx}
ModelBase.prototype.find = function (select, where) {
    return this.Model.find(where, select);
};
ModelBase.prototype.findById = function (select, id) {
    return this.Model.findById(id, select);
};
ModelBase.prototype.findOne = function (select, where) {
    return this.Model.findOne(where, select);
};
ModelBase.prototype.findByIdAndRemove = function (id) {
    return this.Model.findByIdAndRemove(id);
};
ModelBase.prototype.findOneAndRemove = function (where) {
    return this.Model.findOneAndRemove(where);
};
module.exports = ModelBase;