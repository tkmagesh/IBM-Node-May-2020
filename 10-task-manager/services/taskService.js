var taskDb = require('./taskDb');

//using callbacks
/* function getAll(callback){
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
} */


//using promises
function getAll() /* returns a promise when resolved will have the taskList */ {
    return taskDb.readData();
}

function get(id) {
    return taskDb
        .readData()
        .then(function(taskList){
            return taskList.find(task => task.id === id);
        });
}

function save(taskData) {
    return taskDb
        .readData()
        .then(function (taskList) {
            if (taskData.id === 0) {
                taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
                taskList.push(taskData);
            } else {
                taskList = taskList.map(task => task.id === taskData.id ? taskData : task);
            }
            return taskDb
                .writeData(taskList)
                .then(function(){
                    return taskData;  
                });
        });
        
}

function remove(id) {
    return taskDb.readData()
        .then(function(taskList) {
            var newTaskList = taskList.filter(task => task.id !== id);
            return taskDb.writeData(newTaskList);
        });
}
module.exports = { getAll, get, save, remove };