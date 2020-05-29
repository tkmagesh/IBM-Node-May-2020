var path = require('path'),
    fs = require('fs');
    
var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg'];
function isStatic(resource) {
    var resourceExtn = path.extname(resource);
    return staticExtns.indexOf(resourceExtn) >= 0;
}

function serveStatic(req, res) {
    var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourceFullName).pipe(res);
    }
}
module.exports = serveStatic;