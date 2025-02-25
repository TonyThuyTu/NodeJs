const express = require('express');

const ForgotControllers = require('../app/controllers/Forgot.controllers');

const router = express.Router();

console.log("ForgotFile", ForgotControllers);

// Hiện form quên mật khẩu
router.get('/', ForgotControllers.index);

module.exports = router;