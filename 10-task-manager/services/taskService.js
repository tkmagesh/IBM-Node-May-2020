var fs = require('fs'),
    path = require('path');

var dbFile = path.join(__dirname, '../db/taskDb.json');

function readData(callback){
    fs.readFile(dbFile,function(err, rawData){
        var tasks = JSON.parse(rawData);
       /*  
        if (err) return callback(err);
        return callback(null, tasks); 
       */
        if (err){
            callback(err)
        } else {
            callback(null, tasks);
        }
    });
}

function writeData(taskList, callback){
    var rawData = JSON.stringify(taskList);
    fs.writeFile(dbFile, rawData, callback);
}

function getAll(callback){
    readData(function(err, taskList){
        callback(err, taskList);
    });
}

function get(id){
    var taskList = readData();
    return taskList.find(task => task.id === id);
}

function save(taskData){
    var taskList = readData();
    if (taskData.id === 0){
        taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
        taskList.push(taskData);
    } else {
        taskList = taskList.map(task => task.id === taskData.id ? taskData : task);
    }
    writeData(taskList);
    return taskData;
}

function remove(id){
    var taskList = readData();
    taskList = taskList.filter(task => task.id !== id);
    writeData(taskList);
    return;
}

module.exports = { getAll, get, save, remove };