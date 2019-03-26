var path = require('path');
var express = require('express');
var app = express();
var openBrowsers = require('open-browsers');
// 开发模式热更新
if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var config = require('./webpack.config');
  var compiler = webpack(config);
  // use in develope mode
  app.use(
    require('webpack-dev-middleware')(compiler, {
      publicPath: config.output.publicPath
    })
  );
  app.use(require('webpack-hot-middleware')(compiler));

  app.get('/', function(req, res) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result) {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
} else {
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/')));

// 在线用户
var onlineUsers = {};
// 在线用户人数
var onlineCount = 0;

io.on('connection', function(socket) {
  // 监听客户端的登陆
  socket.on('login', function(obj) {
    // 用户id设为socketid
    socket.id = obj.uid;

    // 如果没有这个用户，那么在线人数+1，将其添加进在线用户
    if (!onlineUsers.hasOwnProperty(obj.uid)) {
      onlineUsers[obj.uid] = obj.username;
      onlineCount++;
    }

    // 向客户端发送登陆事件，同时发送在线用户、在线人数以及登陆用户
    io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
    console.log(obj.username + '加入了群聊');
  });

  // 监听客户端的断开连接
  socket.on('disconnect', function() {
    // 如果有这个用户
    if (onlineUsers.hasOwnProperty(socket.id)) {
      var obj = { uid: socket.id, username: onlineUsers[socket.id] };

      // 删掉这个用户，在线人数-1
      delete onlineUsers[socket.id];
      onlineCount--;

      // 向客户端发送登出事件，同时发送在线用户、在线人数以及登出用户
      io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj });
      console.log(obj.username + '退出了群聊');
    }
  });

  // 监听客户端发送的信息
  socket.on('message', function(obj) {
    io.emit('message', obj);
    console.log(obj.username + '说:' + obj.message);
  });
});

server.listen(3300, function(err) {
  if (process.env.NODE_ENV !== 'production') {
    openBrowsers('http://localhost:3300');
  }
  console.log('Listening at *:3300');
});
