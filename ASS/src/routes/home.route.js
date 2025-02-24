const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/home.controller');

router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/about', homeController.about);

module.exports = router;
