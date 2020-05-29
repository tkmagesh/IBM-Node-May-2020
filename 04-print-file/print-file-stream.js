var fs = require('fs');

var stream = fs.createReadStream('./sample.txt', { encoding: 'utf8' });

//readable stream events -> open, data, end, close, error
//var readCount = 0;

/* stream.on('data', function(chunk) {
    //++readCount;
    console.log(chunk);
}); */

//stream.pipe(process.stdout);

var destStream = fs.WriteStream('./sample-copy.txt');

stream.pipe(destStream);

stream.on('end', function(){
    console.log('Thats all folks');
    //console.log(readCount, ' chunks are read');
});

stream.on('error', function(e){
    console.log('something went wrong');
    console.log(e);
});