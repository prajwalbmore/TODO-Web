const express = require('express');
const taskController = require('../controllers/taskController');
const {auth} = require('../middleware/auth');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/addTask', auth,upload.single('image'), taskController.addTask);
//http://localhost:5005/api/task/addTask

router.get('/getTaskById/:id',auth,taskController.getTaskById)
//http://localhost:5005/api/task/getTaskById/:id

router.get('/getAllTask',auth,taskController.getAllTask);
//http://localhost:5005/api/task/getAllTask

router.put('/updateTask/:id',auth,taskController.updateTask)
//http://localhost:5005/api/task/updateTask/:id

router.delete('/deleteTaskById/:id',auth,taskController.deleteTaskById)
//http://localhost:5005/api/task/deleteTaskById/:id

router.get('/getTasksForUser',auth,taskController.getTasksForUser);
//http://localhost:5005/api/task/getTasksForUser

router.get('/getFilteredTasks',auth,taskController.getFilteredTasks);
//http://localhost:5005/api/task/getFilteredTasks

module.exports = router;   