/// <reference path="../../typings/angular.d.ts" />

angular.module("app.chat")
    .constant("MESSAGE_TYPE", {
        NORMAL: 0,
        ENTER: 1,
        LEAVE: 2,
        ME: 3,
        UPDATE: 4,
    })
    .controller("ChatController", ["$scope", "MESSAGE_TYPE", "socketio", "popup",
        function ($scope, MESSAGE_TYPE, socketio, popup) {
            var vm = this;
            //$scope.username = vm.username;
            vm.chatItems = [];
            vm.random = 0;
            vm.setContentClass = function (item) {
                switch (item) {
                    case MESSAGE_TYPE.NORMAL:
                        return "content-you";
                    case MESSAGE_TYPE.ENTER:
                        return "content-enterleave";
                    case MESSAGE_TYPE.LEAVE:
                        return "content-enterleave";
                    case MESSAGE_TYPE.UPDATE:
                        return "content-enterleave";
                    case MESSAGE_TYPE.ME:
                        return "content-me";
                    default:
                        return "content-you";
                }
            };
            vm.send = function (msg) {
                if (msg)
                    socket.send(msg);
            };
            vm.logout = function () {
                socket.emit(socket.EVENT_LOGOUT);
            };
            vm.settings = function () {
                popup.window({
                    title: "个人设置",
                    successText: "保存",
                    cancelText: "取消",
                    // fnSuccess: function () {
                    //     alert("aa");
                    //     return false;
                    // },
                    bodyTemplateUrl: "/chat/settings",
                    scope: vm
                });
            };
            $scope.$on("uploadCompleted", function (event, r) {
                vm.random = r;
                socket.emit(socket.EVENT_AVATAR_UPDATED, r);
            });
            $scope.$on("updatedInfo", function (event, nickname) {
                vm.nickname = nickname;
                socket.emit(socket.EVENT_UPDATE_INFO, nickname);
            });

            var information = function (data) {
                var msg = "";
                switch (data.type) {
                    case 1:
                        msg = data.nickname + " 进入了聊天室";
                        break;
                    case 2:
                        msg = data.nickname + " 离开了聊天室";
                        break;
                    case 4:
                        msg = data.oldNickname + " 把名字改为 " + data.nickname;
                        break;
                }
                data.msg = msg;
                $scope.$apply(function () {
                    vm.chatItems.push(data);
                });
            };
            var socket = socketio.socket;
            socket.on(socket.EVENT_SERVER_STATUS, function (data) {
                $scope.$apply(function () {
                    vm.online = data.online;
                });
            });
            socket.on(socket.EVENT_UPDATE_INFO, function (data, fn) {
                fn(data.id, vm.username, vm.nickname);
            });
            socket.on(socket.EVENT_UPDATE, function (data) {
                information(data);
            });
            socket.on(socket.EVENT_ENTER, function (data) {
                information(data);
            });
            socket.on(socket.EVENT_LEAVE, function (data) {
                information(data);
            });
            socket.on(socket.EVENT_AVATAR_UPDATED, function (data) {
                vm.random = data.random;
                $scope.$apply();
            });
            //订阅消息事件
            socket.on(socket.EVENT_MESSAGE, function (data) {
                if (data.id == socket.id) {
                    data.type = MESSAGE_TYPE.ME;
                }
                $scope.$apply(function () {
                    vm.chatItems.push(data);
                });
            });
        }]);