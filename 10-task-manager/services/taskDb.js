var fs = require('fs'),
    path = require('path'),
    util = require('util'),
    bluebird = require('bluebird');

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
/* function readData() {
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
} */

//using util.promisify
/* var readFileAsync = util.promisify(fs.readFile);
var writeFileAsync = util.promisify(fs.writeFile);

async function readData() {
    var rawData = await readFileAsync(dbFile);
    return JSON.parse(rawData);
}

async function writeData(taskList) {
    var rawData = JSON.stringify(taskList);
    return await writeFileAsync(dbFile, rawData);
} */

//using bluebird

bluebird.promisifyAll(fs);

async function readData() {
    var rawData = await fs.readFileAsync(dbFile);
    return JSON.parse(rawData);
}

async function writeData(taskList) {
    var rawData = JSON.stringify(taskList);
    return await fs.writeFileAsync(dbFile, rawData);
}

module.exports = { readData, writeData };