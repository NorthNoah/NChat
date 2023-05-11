const express = require("express")
const app = express()
const PORT = 4000

// 导入HTTP和cors库
const server = require("http").Server(app)
const cors = require("cors")

app.use(cors())

// 导入socket.io库
const { Server } = require("socket.io")
// 创建实时连接
const socketIO = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
	},
})

// 监听连接
socketIO.on('connection', (socket) => {
    console.log(`${socket.id}用户已连接`)
    socket.on('disconnect', () => [
        console.log("一个用户已经断开连接")
    ])
})

app.get("/api", (req, res) => {
	res.json({
		message: "Hello World",
	})
})

app.listen(PORT, () => {
	console.log("server listening on ${PORT}")
})
