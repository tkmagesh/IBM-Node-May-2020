var http = require('http');
var port = 8080;

/* 
    req -> IncomingMessage -> Readable
    res -> ServerResponse -> Writable
*/
var responseHTML = '<html><head></head><body><h1>Welcome to Node.js</h1></body></html>';
var server = http.createServer(function(req, res){
    console.log(req.method + '\t' + req.url);
    //res.write('Welcome to Node.js!');
    res.write(responseHTML);
    res.end();
});

server.listen(port);

server.on('listening', function(){
    console.log('server listening on port - ', port);
});