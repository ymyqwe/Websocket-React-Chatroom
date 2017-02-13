var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
var server =require('http').createServer(app);
var io = require('socket.io')(server);
var compiler = webpack(config);

app.use(express.static(path.join(__dirname, '/')))

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

// 在线用户
var onlineUsers = {};
// 在线用户人数
var onlineCount = 0;

io.on('connection', function(socket) {
    // 监听客户端的登陆
    socket.on('login', function(obj){

        // 用户id设为socketid
        socket.id = obj.uid;

        // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
        if (!onlineUsers.hasOwnProperty(obj.uid)) {
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }

        // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了群聊');
    })

    // 监听客户端的断开连接
    socket.on('disconnect', function() {

        // 如果有这个用户
        if(onlineUsers.hasOwnProperty(socket.id)) {
            var obj = {uid:socket.id, username:onlineUsers[socket.id]};

            // 删掉这个用户，在线人数-1
            delete onlineUsers[socket.id];
            onlineCount--;

            // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了群聊');
        }
    })

    // 监听客户端发送的信息
    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username+"说:"+ obj.message)
    })

})

server.listen(3300, function(err) {
    console.log('Listening at *:3300');
})