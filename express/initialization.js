var express = require("express");
express.renderInternal = function (path, options, layout) {
    options = options || {};
    options["layout"] = layout;
    return function (req, res) {
        res.render(path, options);
    };
};
express.renderWithLayout = function (path, options) {
    return this.renderInternal(path, options, "layout");
};
express.render = function (path, options) {
    return this.renderInternal(path, options, false);
};