/*var express = require('express'),http = require('http');
var app = express();
var server = http.createServer(app);
app.set('views',__dirname + '/views');
app.configure(function(){
	app.use(express.static(__dirname));
});
app.get('/',function(req,res){
	res.render('index.jade',{layout:false});
});
var port = process.env.C9_PORT || 8080 
//20582 para nodester
server.listen(port);*/

var express = require('express')
var app = express.createServer();
app.set('views',__dirname + '/views');
app.configure(function(){
	app.use(express.static(__dirname));
});
app.get('/',function(req,res){
	res.render('index.jade',{layout:false});
});
var port = process.env.C9_PORT || 8080 
//20582 para nodester
app.listen(port);

var io;
io = require('socket.io').listen(app);
io.sockets.on('connection', function(socket) {
socket.on('drawClick', function(data) {
  socket.broadcast.emit('draw', {
	x: data.x,
	y: data.y,
	type: data.type
  });
});
});