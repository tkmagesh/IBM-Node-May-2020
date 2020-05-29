var path = require('path'),
    fs = require('fs');
    
var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico', '.jpg'];
function isStatic(resource) {
    var resourceExtn = path.extname(resource);
    return staticExtns.indexOf(resourceExtn) >= 0;
}

function serveStatic(req, res, next) {
    var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourceFullName = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourceFullName)){
            return next();
        }
        //fs.createReadStream(resourceFullName).pipe(res);
        var stream = fs.createReadStream(resourceFullName);
        stream.pipe(res);
        /*  stream.on('data', function(chunk){
            console.log('[@serveStatic] - data event triggered - sending chunk');
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('[@serveStatic] - end event triggered');
            res.end();
        }); */

        stream.on('end', function(){
            next();
        });

        /* 
        var fileContents = fs.readFileSync(resourceFullName);
        res.write(fileContents);
        res.end(); 
        */
    } else {
        next();
    }
}
module.exports = serveStatic;