const express = require("express");
const router = express.Router();
const UserForgot = require("../app/controllers/Forgot.controllers");

router.get("/", UserForgot.index); // Hiển thị form
router.post("/", UserForgot.sendResetLink); // Xử lý gửi email

module.exports = router;
