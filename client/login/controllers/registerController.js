/// <reference path="../../typings/angular.d.ts" />

angular.module("app.login")
    .controller("RegisterController", ["$http", "$window", "URL", "security",
        function ($http, $window, URL, security) {
            var vm = this;
            vm.isValid = true;
            vm.serverError = "";
            vm.url = URL.CAPTCHA;
            var validate = function (form) {
                return form.$valid;
            };
            vm.register = function (form) {
                if (validate(form)) {
                    vm.isValid = true;

                    var postData = {
                        username: vm.loginUser.name,
                        password: security.sha256(vm.loginUser.password),
                        email: vm.loginUser.email,
                        captcha: vm.loginUser.captcha,
                    };
                    vm.serverError = "";
                    return $http.post(URL.REGISTER, postData).then(function (res) {
                        console.log(res);
                        if (res.status == 200) {
                            //$localStorage.token = res.data.token;
                            $window.location.href = "/chat/chat?token=" + res.data.token;
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