const express = require('express');
const { body } = require('express-validator');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/login', usersController.login);

module.exports = router;