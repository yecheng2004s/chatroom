angular.module("app.chat")
    .controller("SettingsController", ["$scope", "$rootScope", "$http", "popup",
        function ($scope, $rootScope, $http, popup) {
            var vm = this;
            vm.random = $scope.data.random;
            vm.username = $scope.data.username;
            vm.nickname = $scope.data.nickname;

            $scope.$on("uploadCompleted", function (event, r) {
                vm.random = r;
                $scope.$apply();
            });
            $scope.$on("uploadError", function (event, msg) {
                vm.error = msg;
                $scope.$apply();
            });
            $scope.callback.success = function () {
                var nickname = formSettings.nickname.value;
                if (nickname.trim()) {
                    return $http.post("/chat/settings", { nickname: nickname }).then(function (res) {
                        if (res.status == 200) {
                            $rootScope.$broadcast("updatedInfo", nickname);
                            popup.alert("更新成功！");
                        } else {
                            popup.alert("更新失败！");
                        }
                    }, function (e) {
                        vm.error = e.data.message;
                        return false;
                    });
                } else {
                    vm.error = "昵称不能为空";
                    return false;
                }
            };
        }]);