const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/auth.controllers");

router.get("/", AuthController.logout);

module.exports = router;
