
const { register } = require('../controller/usersController.js')
const { Router } = require('express');
const router = Router();

router.post("/register", register)

module.exports = router
