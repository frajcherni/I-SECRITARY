const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

// Protected route
router.get('/protected', userController.protected);

router.post('/createPayment', userController.createAccount);
router.get('/commondata/get/:requestID', userController.commonData);
router.get("/allUsers",userController.finALlUsers)

module.exports = router;
