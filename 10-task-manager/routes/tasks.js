var express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService');

router.get('/', function (req, res, next){
    res.json(taskService.getAll());
});

router.get('/:id', function (req, res, next) {
    var taskId = parseInt(req.params.id);
    var resultTask = taskService.get(taskId);
    if (resultTask){
        res.json(resultTask);
    } else {
        next();
    }
});

router.post('/', function(req, res, next){
    var newTaskData = req.body;
    var newTask = taskService.save(newTaskData);
    res.status(201).json(newTask);
});

router.put('/:id', function(req, res, next){
    var taskToUpdate = req.body;
    var existingTask = taskService.get(taskToUpdate.id);
    if (!existingTask){
        return next();
    }
    var updatedTask = taskService.save(taskToUpdate);
    res.json(updatedTask);
});

router.delete('/:id', function(req, res, next){
    var taskIdToDelete = parseInt(req.params.id);
    var existingTask = taskService.get(taskIdToDelete);
    if (!existingTask) {
        return next();
    }
    taskService.remove(taskIdToDelete);
    res.status(200).json({});
});

module.exports = router;