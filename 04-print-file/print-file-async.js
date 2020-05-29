var fs = require('fs');

//Error First Callback Pattern
fs.readFile('./sample1.txt', { encoding: 'utf8'}, function(e, fileContents){
    if (e){
        console.log('something went wrong');
        console.log(e);
        return;
    }
    console.log(fileContents);
    console.log('Thats all folks');
});