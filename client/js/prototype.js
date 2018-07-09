(function () {
    String.prototype.format = function () {
        var result = this;
        for (var i = 0; i < arguments.length; i++) {
            if (void 0 != arguments[i]) {
                var reg = new RegExp("({)" + i + "(})", "g");
                result = result.replace(reg, arguments[i]);
            }
        }
        return result;
    };
    Array.prototype.remove = function (fn) {
        for (var i = 0; i < this.length; i++) {
            if (fn(this[i]))
                this.splice(i, 1);
        }
    };
})();