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
		return res.json({ status: true, user }) //返回true状态和user对象
	} catch (error) {
		next(error)
	}
}

module.exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ username })
		// 1.检验用户是否存在
		if (!user) {
			return res.json({ msg: "不正确的用户名或密码哦", status: false })
		}
		// 2.检验密码是否正确，前端发送的password和user.password进行比较
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.json({ msg: "不正确的用户名或密码哦", status: false })
		}
		delete user.password
		return res.json({ status: true, user }) //返回true状态和user对象
	} catch (error) {
		next(error)
	}
}

module.exports.setAvatar = async (req, res, next) => {
	try {
		const userId = req.params.id
		const avatarImage = req.body.image
		const userData = await User.findByIdAndUpdate(
			userId,
			{
				isAvatarImageSet: true,
				avatarImage,
			},
			{ new: true }
		)
		return res.json({
			isSet: userData.isAvatarImageSet,
			image: userData.avatarImage,
		})
	} catch (err) {
		next(err)
	}
}

module.exports.getAllUsers = async (req, res, next) => {
	try {
		// 取数据库中对应id的User对象，select所需的字段
		const users = await User.find({_id: {$ne: req.params.id}}).select([
			"email",
			"username",
			"avatarImage",
			"_id"
		])
		return res.json(users)
	} catch (err) {
		next(err)
	}
}

