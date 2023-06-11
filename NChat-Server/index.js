const express = require("express")
const app = express()
// 引入路由
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
// 引入socket.io库
const socket = require("socket.io")
// 引入配置文件
require("dotenv").config()

// 导入cors库
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
app.use(express.json())
// 用户路由
app.use("/api/auth", userRoutes)
// 消息路由
app.use("/api/messages", messageRoutes)

// mongoose连接数据库
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB Connetion Successfull")
	})
	.catch((err) => {
		console.log(err.message)
	})

// 监听对应端口
const server = app.listen(process.env.PORT, () =>
	console.log(`Server started on ${process.env.PORT}`)
)

// 创建实时连接
const socketIO = socket(server, {
	cors: {
		origin: "http://localhost:3000",
		credentials: true,
	},
})

global.onlineUsers = new Map()
// 监听连接
socketIO.on("connection", (socket) => {
  global.chatSocket = socket;
	console.log(`${socket.id}用户已连接`)
	socket.on("disconnect", () => [console.log("一个用户已经断开连接")])

	// 每当前端添加了一个用户，则获取其userId和socketId，存储在map中
	socket.on("add-user", (userId) => {
		onlineUsers.set(userId, socket.id)
	})

	socket.on("send-msg", (data) => {
		// 获取发送方的Socket
		const sendUserSocket = onlineUsers.get(data.to)
		// 如果发送方在线，存储在数据库中，并且将即时收到消息
		if (sendUserSocket) {
			socket.to(sendUserSocket).emit("msg-receive", data.msg)
		}
	})
})
