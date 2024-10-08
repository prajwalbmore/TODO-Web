const express = require('express')
const userController = require('../controllers/userController')
const { auth } = require('../middleware/auth');
const upload = require('../middleware/multer');
const router = express.Router();

router.post('/register',upload.single('image'),userController.addUser);
//http://localhost:5005/api/auth/register 

router.post('/login',userController.getUser);
//http://localhost:5005/api/auth/login

router.put('/updateUser',auth ,userController.updateUser);
//http://localhost:5005/api/auth/updateUser

router.get('/userInfo',auth,userController.userInformation);
//http://localhost:5005/api/auth/userInfo

router.get('/getAllUsers',auth,userController.getAllUsers)
//http://localhost:5005/api/auth/getAllUsers

module.exports = router;