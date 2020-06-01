var taskDb = require('./taskDb');

function getAll(callback){
    taskDb.readData(function(err, taskList){
        callback(err, taskList);
    });
}

function get(id, callback){
    taskDb.readData(function(err, taskList){
        if (err) return callback(err);
        callback(null, taskList.find(task => task.id === id));
    });
}

function save(taskData, callback){
    taskDb.readData(function(err, taskList){
        if (err) return callback(err);
        if (taskData.id === 0){
            taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
            taskList.push(taskData);
        } else {
            taskList = taskList.map(task => task.id === taskData.id ? taskData : task);
        }
        taskDb.writeData(taskList, function(err){
            if (err) return callback(err);
            callback(null, taskData);
        });
    });
}

function remove(id, callback){
    taskDb.readData(function(err, taskList){
        if (err) return callback(err);
        var newTaskList = taskList.filter(task => task.id !== id);
        taskDb.writeData(newTaskList, function(err){
            callback(err);
        });
    });
}

module.exports = { getAll, get, save, remove };