var sio = require("socket.io");
var logger = require("./utils/logger");
var config = require("./config/config");
var socketioJwt = require("socketio-jwt");//https://github.com/auth0/socketio-jwt

exports.listen = function (server) {
    var socket = sio(server);
    // socket.use(socketioJwt.authorize({
    //     secret: config.tokenSecret,
    //     handshake: true
    // }));
    socket.on("connection", socketioJwt.authorize({
        secret: config.tokenSecret,
        timeout: 15000 // 15 seconds to send the authentication message
    })).on("authenticated", function (skt) {
        //var username = socket.decoded_token.username;
        logger.log("客户端连入：" + skt.client.id);
        var status = { online: Object.keys(socket.sockets.connected).length };
        //向所有客户端发送evtEnter事件
        socket.sockets.emit("evtServerStatus", status);
        //发送evtUpdateInfo事件，用于获取用户信息
        skt.emit("evtUpdateInfo", { id: skt.client.id }, function (id, name, nickname) {
            skt.client.name = name;
            skt.client.nickname = nickname;
            var data = { id: id, name: name, nickname: nickname, type: 1, msg: "" };
            //向所有客户端发送evtEnter事件
            socket.sockets.emit("evtEnter", data);
        });
        skt.on("evtUpdateInfo", function (nickname) {
            var oldNickname = skt.client.nickname;
            if (nickname === oldNickname) {
                return;
            }
            skt.client.nickname = nickname;
            var data = { id: skt.client.id, name: skt.client.name, nickname: skt.client.nickname, oldNickname: oldNickname, type: 4, msg: "" };
            socket.sockets.emit("evtUpdate", data);
        });
        //订阅消息事件
        skt.on("message", function (msg) {
            var data = { id: skt.client.id, name: skt.client.name, nickname: skt.client.nickname, type: 0, msg: msg };
            //向所有客户端发送发送消息
            socket.sockets.send(data);
        });
        //订阅退出事件
        skt.on("evtLogout", function () {
            skt.disconnect();
        });
        //订阅头像更新事件
        skt.on("evtAvatarUpdated", function (r) {
            var data = { id: skt.client.id, random: r };
            skt.broadcast.emit("evtAvatarUpdated", data);
        });
        //订阅断开事件
        skt.on("disconnect", function () {
            var data = { id: skt.client.id, name: skt.client.name, nickname: skt.client.nickname, type: 2, msg: "" };
            //向所有客户端发送evtLeave事件
            socket.sockets.emit("evtLeave", data);

            var status = { online: Object.keys(socket.sockets.connected).length };
            //向所有客户端发送evtEnter事件
            socket.sockets.emit("evtServerStatus", status);
            logger.log("客户端断开连接：" + skt.client.id);
        });

        //广播
        //sio.sockets.send("xxx");//向所有客户端发送消息
        //sio.sockets.emit("xxx", data);//向所有客户端发送事件
        //skt.broadcast.send("xxx");//该客户端向其他客户端发送消息
        //skt.broadcast.emit("xxx", data);//该客户端向其他客户端发送事件
    });
};