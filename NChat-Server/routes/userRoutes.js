
const { register, login, setAvatar, getAllUsers } = require('../controller/usersController.js')
const { Router } = require('express');
const router = Router();

router.post("/register", register)
router.post("/login", login)
// 注意此处的id是动态的
router.post("/setAvatar/:id", setAvatar)
// 获取所有用户
router.get("/allusers/:id", getAllUsers)

module.exports = router
