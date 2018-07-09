/// <reference path="../typings/angular.d.ts" />

angular.module("utilities", [])
    .directive("captcha", ["guid", function (guid) {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var changeSrc = function () {
                    element.attr("src", scope.$eval(attrs.captcha) + "?r=" + guid.create8());
                };
                changeSrc();
                element.on("click", function () {
                    changeSrc();
                });
            }
        };
    }])
    .factory("security", function () {
        return {
            sha256: function (str) {
                return sha256(str);
            }
        };
    })
    .factory("guid", function () {
        var create = function (format) {
            return format.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == "x" ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });//.toUpperCase();
        };
        return {
            create8: function () {
                return create("xxxxxxxx");
            },
            create32: function () {
                return create("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            }
        };
    });