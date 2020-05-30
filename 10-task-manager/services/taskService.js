
function getAll(){
    var taskList = //read from the taskDb.json file
    return taskList;
}

function get(id){
    var taskList = //read from the taskDb.json file
    return taskList.find(task => task.id === id);
}

function save(taskData){
    var taskList = //read from the taskDb.json file
    if (taskData.id === 0){
        taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
        taskList.push(taskData);
        //write the taskList to the taskDb.json file
    } else {
        taskList = taskList.map(task => task.id === taskData.id ? taskData : task);
        //write the taskList to the taskDb.json file
    }
    return taskData;
}

function remove(id){
    taskList = taskList.filter(task => task.id !== id);
    //write the taskList to the taskDb.json file
    return;
}

module.exports = { getAll, get, save, remove };