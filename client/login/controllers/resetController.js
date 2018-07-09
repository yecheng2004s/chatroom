/// <reference path="../../typings/angular.d.ts" />

angular.module("app.login")
    .controller("ResetController", ["$http", "$window", "URL", "security",
        function ($http, $window, URL, security) {
            var vm = this;
            vm.isValid = true;
            vm.serverError = "";
            var validate = function (form) {
                return form.$valid;
            };
            vm.reset = function (form) {
                if (validate(form)) {
                    vm.isValid = true;

                    var postData = {
                        password: security.sha256(vm.password),
                    };
                    vm.serverError = "";
                    return $http.post(URL.RESET, postData).then(function (res) {
                        console.log(res);
                        if (res.status == 200) {
                            if (res.data === true)
                                vm.serverError = "reset success";
                            $window.location.href = "/";
                        } else {
                            vm.serverError = res.data.message;
                        }
                    }, function (e) {
                        vm.serverError = e.data.message;
                    });
                } else {
                    vm.isValid = false;
                }
            };
        }]);