/// <reference path="../typings/angular.d.ts" />

angular.module("app.chat")
    .filter("message", ["CONTENT_TYPE",
        function (CONTENT_TYPE) {
            return function (input, item) {
                if (item.type == CONTENT_TYPE.normal || item.type == CONTENT_TYPE.me) {
                    return item.name + " : " + input;
                }
                return input;
            };
        }]);