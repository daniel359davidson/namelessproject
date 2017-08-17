//http
var http = require('http');
//ws
var ws =  new require('ws');
//mysql
var mysql = require('mysql');
//connected clients
var clients = new Array();

var wsServer = new ws.Server({port:8081})

wsServer.on('conection',function(ws){
     conectionID = Math.random();
     clients[conectionID] = ws;
     console.log("новое соединение " + conect_id);
     ws.on('message', function(message) {
              for (var key in clients){
                   clients[key].send(message);
              }
     });
})

var httpServer =   http.createServer(function(res,req){
     res.end();
}).listen(8080);
console.log("Сервер запущен на портах 8080, 8081");
