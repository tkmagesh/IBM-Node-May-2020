var http = require('http'),
    path = require('path'),
    fs = require('fs');
var port = 8080;
var server = http.createServer(function(req, res){
    console.log(req.method + '\t' + req.url);
    var resourceRequested = req.url === '/' ? 'index.html' : req.url;
    var resourceFullName = path.join(__dirname, resourceRequested);
    if (fs.existsSync(resourceFullName)){
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }
});
server.listen(port);
server.on('listening', function(){
    console.log('server listening on port - ', port);
});