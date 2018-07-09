/// <reference path="../../typings/angular.d.ts" />

angular.module("app.chat")
    .service("socketio", ["$localStorage",
        function ($localStorage) {
            var token = $localStorage.token;
            var socket = io.connect();
            socket.EVENT_MESSAGE = "message";
            socket.EVENT_CONNECT = "connect";
            socket.EVENT_LEAVE = "evtLeave";
            socket.EVENT_ENTER = "evtEnter";
            socket.EVENT_UPDATE = "evtUpdate";
            socket.EVENT_UPDATE_INFO = "evtUpdateInfo";
            socket.EVENT_SERVER_STATUS = "evtServerStatus";
            socket.EVENT_LOGOUT = "evtLogout";
            socket.EVENT_AVATAR_UPDATED = "evtAvatarUpdated";

            socket.on(socket.EVENT_CONNECT, function () {
                socket.emit("authenticate", { token: token }) //send the jwt
                    .on("authenticated", function () {
                        console.log("authenticated");
                    })
                    .on("unauthorized", function (error, callback) {
                        console.log("unauthorized");
                    });
            });
            // socket.on('connect', function () {
            //     socket.on("unauthorized", function (error, callback) {
            //         if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
            //             // redirect user to login page perhaps or execute callback:
            //             callback();
            //             console.log("User's token has expired");
            //         }
            //     });
            // })
            this.socket = socket;
        }]);