const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/user.controller");
const authMiddleware = require("../app/middleware/authMiddleware"); // Middleware kiểm tra đăng nhập

router.get("/", authMiddleware, UserController.profile);

module.exports = router;
