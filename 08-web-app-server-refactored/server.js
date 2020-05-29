var http = require('http');

var dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler'),
    app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);
//console.log(req.method + '\t' + req.urlObj.pathname);

var server = http.createServer(app);
server.listen(9090);
server.on('listening', function(){
    console.log('web app server listening on port  9090');
});