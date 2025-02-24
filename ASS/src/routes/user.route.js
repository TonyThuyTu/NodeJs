const express = require("express");
const router = express.Router();
const userController = require("../../src/app/controllers/user.controller"); 

router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);

module.exports = router;
