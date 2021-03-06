const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/users', userController.signUp);
router.get('/users', userController.list);
router.get('/users/:email', userController.find);

module.exports = router;
