var fs = require('fs'),
    path = require('path');

var dbFile = path.join(__dirname, '../db/taskDb.json');

function readData(callback) {
    fs.readFile(dbFile, function (err, rawData) {
        var tasks = JSON.parse(rawData);
        /*  
         if (err) return callback(err);
         return callback(null, tasks); 
        */
        if (err) {
            callback(err)
        } else {
            callback(null, tasks);
        }
    });
}

function writeData(taskList, callback) {
    var rawData = JSON.stringify(taskList);
    fs.writeFile(dbFile, rawData, callback);
}

module.exports = { readData, writeData };