/// <reference path="../../typings/angular.d.ts" />

angular.module("app.chat")
    .directive("scrollBottom", function () {
        return {
            restrict: "A",
            scope: {
                value: "=scrollBottom"
            },
            link: function (scope, element, attrs) {
                var fn = function () {
                    return scope.value;
                };
                scope.$watch(fn, function () {
                    element.scrollTop(element[0].scrollHeight);
                });
            }
        };
    })
    .directive("send", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                var txt = element.find("input[type=text]");
                var btn = element.find("input[type=button]");
                btn.bind("click", function () {
                    scope.vm.send(txt.val());
                    txt.val("");
                    txt.focus();
                });
                txt.bind("keydown", function (e) {
                    if (e.keyCode === 13) {
                        scope.vm.send(txt.val());
                        txt.val("");
                    }
                });
            }
        };
    })
    .directive("message", ["$compile", "MESSAGE_TYPE",
        function ($compile, MESSAGE_TYPE) {
            return {
                restrict: "A",
                scope: {
                    item: "=",
                    random: "="
                },
                link: function (scope, element, attrs) {
                    var id = "";
                    switch (scope.item.type) {
                        case MESSAGE_TYPE.NORMAL:
                            id = "#messageTemplate";
                            break;
                        case MESSAGE_TYPE.ENTER:
                            id = "#enterLeaveTemplate";
                            break;
                        case MESSAGE_TYPE.LEAVE:
                            id = "#enterLeaveTemplate";
                            break;
                        case MESSAGE_TYPE.UPDATE:
                            id = "#enterLeaveTemplate";
                            break;
                        case MESSAGE_TYPE.ME:
                            id = "#messageTemplate";
                            break;
                        default:
                            id = "#messageTemplate";
                    }
                    scope.item.random = scope.random;
                    var html = angular.element(document.querySelector(id)).html();
                    var c = $compile(html)(scope);
                    element.after(c);
                },
                replace: true
            };
        }]);