
const { register, login, setAvatar } = require('../controller/usersController.js')
const { Router } = require('express');
const router = Router();

router.post("/register", register)
router.post("/login", login)
// 注意此处的id是动态的
router.post("/setAvatar/:id", setAvatar)

module.exports = router
