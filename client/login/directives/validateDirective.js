/// <reference path="../../typings/angular.d.ts" />

angular.module("app.login")
    .constant("ERRORS", {
        email: { attrName: "", msg: "email format is invalid" },
        required: { attrName: "placeholder", msg: "{0} is required" },
        minlength: { attrName: "ngMinlength", msg: "input must be more than {0} characters" },
        maxlength: { attrName: "ngMaxlength", msg: "input must be less than {0} characters" },
        same: { attrName: "", msg: "must same as password" },
    })
    .directive("fieldError", ["$compile",
        function ($compile) {
            return {
                restrict: "A",
                require: "ngModel",//这个元素上必须有一个ng-model属性，否则报错
                link: function (scope, element, attrs, ngModel) {
                    var subScope = scope.$new(true);//true:这个子scope是个独立作用域
                    subScope.attrs = attrs;
                    subScope.hasError = function () {
                        var isValid = scope.$eval(attrs.fieldError);
                        return ngModel.$invalid && (ngModel.$dirty || !isValid);
                    };
                    subScope.errors = ngModel.$error;
                    var hint = $compile("<ul class=\"field-error\" ng-if=\"hasError()\"><li ng-repeat=\"(name, isErr) in errors\">{{name | error:attrs}}</li></ul>")(subScope);
                    element.after(hint);
                }
            };
        }])
    .filter("error", ["ERRORS",
        function (ERRORS) {
            return function (input, attrs) {
                var err = ERRORS[input];
                if (err) {
                    var value = attrs[err.attrName];
                    var msg = err.msg;
                    if (value) {
                        return msg.format(value);
                    } else {
                        return msg;
                    }
                } else {
                    return input;
                }
            };
        }])
    .directive("sameAs", function () {
        return {
            restrict: "A",
            require: "ngModel",
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return;
                var isSame = function (value) {
                    var anotherValue = scope.$eval(attrs.sameAs);
                    if (anotherValue) {
                        return value === anotherValue;
                    } else {
                        //undefined:该model未初始化或未通过验证
                        return true;
                    }
                };
                //版本1.3之前只能使用 $parsers
                /*ngModel.$parsers.push(function (viewValue) {
                    if (isSame(viewValue)) {
                        ngModel.$setValidity("same", true);
                    } else {
                        ngModel.$setValidity("same", false);
                    }
                    return true;
                })*/
                //版本1.3开始可以使用 $validators
                ngModel.$validators.same = function (value) {
                    return isSame(value);
                };
                scope.$watch(function () {
                    return scope.$eval(attrs.sameAs);
                }, function (newValue) {
                    ngModel.$setValidity("same", isSame(element.val()));
                });
            }
        };
    });