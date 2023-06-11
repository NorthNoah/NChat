
const { register, login, setAvatar, getAllUsers, logOut } = require('../controller/usersController.js')
const { Router } = require('express');
const router = Router();

router.post("/register", register)
router.post("/login", login)
// 注意此处的id是动态的
router.post("/setavatar/:id", setAvatar)
// 获取所有用户
router.get("/allusers/:id", getAllUsers)
router.get("/logout/:id", logOut);

module.exports = router
