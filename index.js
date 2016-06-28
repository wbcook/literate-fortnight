var path = require('path');
var express = require('express');
var http = require('http').Server();
var io = require('socket.io')(http);
var app = express();

app.set('port', (process.env.PORT || 3000));

// mount the static middleware at the path '/' to serve files from /public
app.use('/', express.static(path.join(__dirname, 'public')));

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

app.listen(app.get('port'), function() {
  console.log('App started on port: ' + app.get('port'));
});

http.listen('1337', function() {
  console.log('Http started on port: ' + '1337');
});
