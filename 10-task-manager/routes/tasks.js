var express = require('express'),
    router = express.Router();

var taskList = [
    {id : 1, name : 'Master JavaScript', isCompleted : false},
    { id: 2, name: 'Explore Node.js', isCompleted: true }
];

router.get('/', function (req, res, next){
    res.json(taskList);
});


router.get('/:id', function (req, res, next) {
    var taskId = parseInt(req.params.id);
    /* var resultTask = taskList.find(function(task){
        return task.id === taskId
    }); */
    var resultTask = taskList.find(task => task.id === taskId);
    if (resultTask){
        res.json(resultTask);
    } else {
        next();
    }
});

router.post('/', function(req, res, next){
    var newTask = req.body;
    newTask.id = taskList.reduce((result, task) => result > task.id ? result : taskId, 0) + 1;
    taskList.push(newTask);
    res.status(201).json(newTask);
});

module.exports = router;