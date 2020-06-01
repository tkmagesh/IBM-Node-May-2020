var express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService'),
    createError = require('http-errors');

//using callback apis
/* router.get('/', function (req, res, next){
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
    
}); */

//using promise apis
router.get('/', function (req, res, next) {    
    taskService
        .getAll()
        .then(function(taskList){
            res.json(taskList);
        })
        .catch(function(err){
            next(err);
        });
});


router.get('/:id', function (req, res, next) {
    var taskId = parseInt(req.params.id);
    taskService.get(taskId)
        .then(function(resultTask){
            if (!resultTask){
                next(createError(404));
            } else {
                res.json(resultTask);
            }
        })
        .catch(function(err){
            return next(err);
        });
});

router.post('/', function (req, res, next) {
    var newTaskData = req.body;
    taskService
        .save(newTaskData)
        .then(function(newTask){
            res.status(201).json(newTask);
        })
        .catch(function(err){
            return next(err);
        });
});

router.put('/:id', function (req, res, next) {
    var taskToUpdate = req.body;
    taskService
        .get(taskToUpdate.id)
        .then(function(existingTask) {
            if (!existingTask) {
                return next();
            }
            return taskService
                .save(taskToUpdate)
                .then(function (updatedTask) {
                    res.json(updatedTask);
                });
        })
        .catch(function(err){
            next(err);
        });
});

router.delete('/:id', function (req, res, next) {
    var taskIdToDelete = parseInt(req.params.id);
    taskService
        .get(taskIdToDelete)
        .then(function (existingTask) {
            if (!existingTask) {
                return next();
            }
            return taskService
                .remove(taskIdToDelete)
                .then(function(){
                    res.status(200).json({});
                });
        })
        .catch(function(err){
            next(err);
        });
});

module.exports = router;