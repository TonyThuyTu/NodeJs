const express = require('express');
const loginControllers = require('../app/controllers/login.controllers');


const router = express.Router();

// console.log("loginfile", loginControllers);


// Hiện form đăng nhập
router.get('/', loginControllers.index);
// Xử lý đăng nhập
// router.post('/login', loginControllers.login);

module.exports = router;
