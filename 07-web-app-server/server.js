var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    querystring = require('querystring'),
    path = require('path'),
    calculator = require('./calculator');

/* 
    dataParser.js
    serveStatic.js
    serveCalculator.js
    notFoundHandler.js
*/

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg'];
function isStatic(resource){
    var resourceExtn = path.extname(resource);
    return staticExtns.indexOf(resourceExtn) >= 0;
}
var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    var resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
    if (isStatic(resourceName)){
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    } else if (urlObj.pathname === '/calculator' && req.method === 'GET') {
        var queryData = querystring.parse(urlObj.query),
            op = queryData.op,
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            result = calculator[op](x, y);
        res.write(result.toString());
        res.end();
    } else if (urlObj.pathname === '/calculator' && req.method === 'POST') {
        var rawData = '';
        req.on('data', function (chunk) {
            rawData += chunk;
        });
        req.on('end', function () {
            var bodyData = querystring.parse(rawData),
                op = bodyData.op,
                x = parseInt(bodyData.x),
                y = parseInt(bodyData.y),
                result = calculator[op](x, y);
            res.write(result.toString());
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(9090);

server.on('listening', function(){
    console.log('web app server listening on port  9090');
});