const app = require('express')();
const bodyParser  = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const portNumber = 3001;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(bodyParser.json());

app.post('/', function(req, res){
  //if(res.socket.remoteAddress == '127.0.0.1') {
      // The server is trying to send us an activity message
      res.writeHead(200, [
        ["Content-Type", "text/plain"],
        ["Content-Length", 0]
      ]);
      res.write('');
      res.end();
       if (req.body) {
         io.emit('public data changes', req.body);
       }
  //}
});

io.on('connection', function(socket){
  /*
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  */
  /*
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  */
});

// Om man vill skicka till alla utom sig själv...
//io.on('connection', function(socket){
//  socket.broadcast.emit('hi');
//});

io.on('connection', function(socket){
  socket.on('public data changes', function(msg){
    io.emit('public data changes', msg);
  });
});

http.listen(portNumber, function(){
  console.log('listening on *:3001');
});