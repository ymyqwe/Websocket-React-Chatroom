var path = require('path');
var express = require('express');
var app = express();
var webpack = require('webpack');
var config = require('./webpack.config');
var server =require('http').createServer(app);
var io = require('socket.io')(server);
var compiler = webpack(config);

app.use(express.static(path.join(__dirname, '/')))

// use in develope mode
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

var onlineUsers = {};
var onlineCount = 0;

io.on('connection', function(socket) {
    socket.on('login', function(obj){
        socket.id = obj.uid;
        if (!onlineUsers.hasOwnProperty(obj.uid)) {
            onlineUsers[obj.uid] = obj.username;
            onlineCount++;
        }
        console.log(onlineUsers, onlineCount); 
        io.emit('login', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
        console.log(obj.username+'加入了群聊');
    })

    socket.on('disconnect', function() {
        if(onlineUsers.hasOwnProperty(socket.id)) {
            var obj = {uid:socket.id, username:onlineUsers[socket.id]};

            delete onlineUsers[socket.id];
            onlineCount--;

            io.emit('logout', {onlineUsers:onlineUsers, onlineCount:onlineCount, user:obj});
            console.log(obj.username+'退出了群聊');
        }
    })

    socket.on('message', function(obj){
        io.emit('message', obj);
        console.log(obj.username+"说:"+ obj.message)
    })

})
server.listen(3300, function(err) {
    console.log('Listening at *:3300');
})