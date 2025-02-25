const express = require('express');
const SiginControllers = require('../app/controllers/sigin.controllers');


const router = express.Router();

// console.log("loginfile", SiginControllers);


// Hiện form đăng ký
router.get('/', SiginControllers.index);
// Xử lý đăng nhập
// router.post('/login', loginControllers.login);

module.exports = router;
