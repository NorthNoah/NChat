const User = require("../models/userModel")
const bcrypt = require("bcrypt")
// 检查用户名/emial是否存在-
module.exports.register = async (req, res, next) => {
	try {
		const { username, email, password, confirmPassword } = req.body
		const usernameCheck = await User.findOne({ username })
		// 1.重复性检验,重复则返回状态为false
		if (usernameCheck) {
			return res.json({ msg: "用户名已经被占用，换一个吧！", status: false })
		}
		const emailCheck = await User.findOne({ email })
		if (emailCheck) {
			return res.json({ msg: "邮箱地址已经被占用，换一个吧！", status: false })
		}
		// 2.插入数据库
		const hashedPassword = await bcrypt.hash(password, 10) // 密码加密转换
		const user = await User.create({
			email,
			username,
			password: hashedPassword,
		})
		delete user.password
		return res.json({ status: true, user })//返回true状态和user对象
	} catch (error) {
        next(error)
    }
}
