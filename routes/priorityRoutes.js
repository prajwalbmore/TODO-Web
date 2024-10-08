const express = require('express');
const priorityController = require('../controllers/priorityController');
const { auth } = require('../middleware/auth');
const router =  express.Router();

router.post('/addpriority',auth,priorityController.addPriority);
//http://localhost:5005/api/priority/addpriority

router.get('/getAllPriority',auth,priorityController.getAllPriority)
//http://localhost:5005/api/priority/getAllPriority

router.get('/getPriorityById/:id',auth,priorityController.getPriorityById)
//http://localhost:5005/api/priority/getPriorityById/:id

router.put('/updatePriorityById/:id',auth,priorityController.updatePriorityById)
//http://localhost:5005/api/priority/updatePriorityById/:id

router.delete('/deletePriority/:id',auth,priorityController.deletePriority);
//http://localhost:5005/api/priority/deletePriority/:id

module.exports = router;