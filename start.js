const app = require('express')();
const bodyParser  = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
//const ipaddress = process.env.OPENSHIFT_IP || null;
const portNumber = process.env.PORT || process.env.OPENSHIFT_PORT || 3001;

//const portNumber = 3001;

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
 
});



io.on('connection', function(socket){
  socket.on('public data changes', function(msg){
    io.emit('public data changes', msg);
  });
});

http.listen(portNumber, function(){
  console.log('listening on *:' + portNumber);
});
