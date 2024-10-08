const express = require('express');
const inviteController = require('../controllers/invitesController')
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post('/invitation',auth,inviteController.invitation)
////http://localhost:5005/api/invite/invitation

module.exports = router