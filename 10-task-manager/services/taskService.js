var taskList = [
    { id : 1, name : 'Master JavaScript', isCompleted : false},
    { id: 2, name: 'Explore Node.js', isCompleted: true }
];

function getAll(){
    return taskList;
}

function get(id){
    return taskList.find(task => task.id === id);
}

function save(taskData){
    if (taskData.id === 0){
        taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
        taskList.push(taskData);
    } else {
        taskList = taskList.map(task => task.id === taskData.id ? taskData : task);
    }
    return taskData;
}

function remove(id){
    taskList = taskList.filter(task => task.id !== id);
    return;
}

module.exports = { getAll, get, save, remove };