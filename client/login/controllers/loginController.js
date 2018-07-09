/// <reference path="../../typings/angular.d.ts" />

angular.module("app.login")
    .controller("LoginController", ["$http", "$localStorage", "$window", "URL", "security",
        function ($http, $localStorage, $window, URL, security) {
            var vm = this;
            vm.isValid = true;
            vm.serverError = "";
            var validate = function (form) {
                return form.$valid;
            };
            vm.login = function (form) {
                if (validate(form)) {
                    vm.isValid = true;

                    var postData = {
                        username: vm.loginUser.name,
                        password: security.sha256(vm.loginUser.password),
                    };
                    vm.serverError = "";
                    return $http.post(URL.LOGIN, postData).then(function (res) {
                        console.log(res);
                        if (res.status == 200) {
                            $localStorage.token = res.data.token;
                            //$state.go("chat", { name: vm.loginUser.name }, { reload: true });
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