var express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService');

router.get('/', function (req, res, next){
    //res.json(taskService.getAll());
    taskService.getAll(function(err, taskList){
        if (err){
            return next(404);
        }
        res.json(taskList);
    });
});

router.get('/:id', function (req, res, next) {
    var taskId = parseInt(req.params.id);
    taskService.get(taskId, function(err, resultTask){
        if (err) return next(err);
        if (resultTask) {
            res.json(resultTask);
        } else {
            next();
        }
    });
    
});

router.post('/', function(req, res, next){
    var newTaskData = req.body;
    taskService.save(newTaskData, function(err, newTask){
        if (err) return next(err);
        res.status(201).json(newTask);
    });
});

router.put('/:id', function(req, res, next){
    var taskToUpdate = req.body;
    taskService.get(taskToUpdate.id, function(err, existingTask){
        if (!existingTask) {
            return next();
        }
        taskService.save(taskToUpdate, function(err, updatedTask){
            if (err) return next(err);
            res.json(updatedTask);
        });
    });
    
});

router.delete('/:id', function(req, res, next){
    var taskIdToDelete = parseInt(req.params.id);
    taskService.get(taskIdToDelete, function(err, existingTask){
        if (err) return next(err);
        if (!existingTask) {
            return next();
        }
        taskService.remove(taskIdToDelete, function(err){
            if (err) return next(err);
            res.status(200).json({});
        });
    });
    
});

module.exports = router;