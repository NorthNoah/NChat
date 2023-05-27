const PORT=6000
const MONGO_URL="mongodb://localhost:27017/chat"
const express = require("express")
const app = express()

// 导入cors库
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
app.use(express.json())

// mongoose连接数据库
mongoose
	.connect(MONGO_URL, {
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
const server = app.listen(PORT, () =>
	console.log(`Server started on ${PORT}`)
)

// 导入socket.io库
const socket = require("socket.io")
// 创建实时连接
const socketIO = socket(server, {
	cors: {
		origin: "http://localhost:3000",
	},
})

// 监听连接
socketIO.on("connection", (socket) => {
	console.log(`${socket.id}用户已连接`)
	socket.on("disconnect", () => [console.log("一个用户已经断开连接")])
})

app.get("/api", (req, res) => {
	res.json({
		message: "Hello World",
	})
})
