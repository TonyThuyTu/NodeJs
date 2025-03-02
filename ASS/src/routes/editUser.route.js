const express = require('express');
const editUserControllers = require('../app/controllers/editUser.controllers');
const router = express.Router();

// hiển thị form edit
router.get('/', editUserControllers.getUser);
// Xử lý update
// router.get("/:id", authMiddleware, UserController.getUser);
// router.put("/:id", authMiddleware, UserController.updateUser);

module.exports = router;