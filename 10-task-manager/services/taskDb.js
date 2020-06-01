var fs = require('fs'),
    path = require('path');

var dbFile = path.join(__dirname, '../db/taskDb.json');

//using callbacks
/* function readData(callback) {
    fs.readFile(dbFile, function (err, rawData) {
        var tasks = JSON.parse(rawData);         
         if (err) return callback(err);
         return callback(null, tasks); 
    });
}

function writeData(taskList, callback) {
    var rawData = JSON.stringify(taskList);
    fs.writeFile(dbFile, rawData, callback);
} */

//using promises
function readData() {
    var p = new Promise(function(resolveFn, rejectFn){
        fs.readFile(dbFile, function (err, rawData) {
            if (err) return rejectFn(err);
            var tasks = JSON.parse(rawData);
            return resolveFn(tasks);
        });
    });
    return p;
}

function writeData(taskList) {
    return new Promise(function(resolveFn, rejectFn){
        var rawData = JSON.stringify(taskList);
        fs.writeFile(dbFile, rawData, function(err){
            if (err) return rejectFn(err);
            return resolveFn();
        });
    });
}

module.exports = { readData, writeData };