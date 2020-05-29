var http = require('http');
var dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator');

var server = http.createServer(function(req, res){
    dataParser(req);
    serveStatic(req, res);
    serveCalculator(req, res);
    notFoundHandler(res);
});

server.listen(9090);

server.on('listening', function(){
    console.log('web app server listening on port  9090');
});