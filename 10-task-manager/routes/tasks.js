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

module.exports = router;