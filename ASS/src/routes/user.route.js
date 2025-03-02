const express = require("express");
const router = express.Router();
const UserController = require("../app/controllers/user.controller");
const authMiddleware = require("../app/middleware/authMiddleware"); // Middleware kiểm tra đăng nhập

// Hiên thị form info
router.get("/", authMiddleware, UserController.profile);
// Hiển thị form edit user



module.exports = router;