var express = require('express'),http = require('http');
var stylus  = require('stylus');
var app = express();
var nib = require('nib');
var server = http.createServer(app);
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.configure(function(){
	app.set('views',__dirname + '/views');
    app.set('view engine', 'jade');
	app.use(stylus.middleware(
	  { src: __dirname + '/public'
	  , compile: compile
	  }
	));
	app.use(express.static(__dirname + '/public'));
});
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Mi Primera Aplicacion de Node Js By Daniel Villanueva' }
  )
})

var port = process.env.C9_PORT || 20582 
//20582 para nodester
server.listen(port);
var io;
io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
socket.on('drawClick', function(data) {
  socket.broadcast.emit('draw', {
	x: data.x,
	y: data.y,
	type: data.type
  });
});
});