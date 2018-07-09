/// <reference path="../../typings/angular.d.ts" />

angular.module("app.login")
    .controller("FindController", ["$http", "URL",
        function ($http, URL) {
            var vm = this;
            vm.isValid = true;
            vm.serverError = "";
            var validate = function (form) {
                return form.$valid;
            };
            vm.find = function (form) {
                if (validate(form)) {
                    vm.isValid = true;

                    var postData = {
                        email: vm.email,
                    };
                    vm.serverError = "";
                    return $http.post(URL.FIND, postData).then(function (res) {
                        console.log(res);
                        if (res.status == 200) {
                            vm.serverError = "mail has sent";
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