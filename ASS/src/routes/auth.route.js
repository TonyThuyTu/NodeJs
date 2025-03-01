const express = require('express');
const router = express.Router();
const AuthControllers = require('../app/controllers/auth.controllers');

router.get('/', AuthControllers.logout);

module.exports = router;