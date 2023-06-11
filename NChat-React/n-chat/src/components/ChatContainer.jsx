import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { Avatar } from "antd"
import Logout from "./Logout"
import ChatInput from "./ChatInput"
import axios from "axios"
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes"
import { v4 as uuidv4 } from "uuid"

export default function ChatContainer({ currentChat = {}, curUser, socket }) {
	// 回显信息逻辑：每次curChat更新时，都要去获取数据库中的所有message，更新视图
	const [messages, setMessages] = useState([])
	const [arrivalMessage, setArrivalMessage] = useState("")
	const scrollRef = useRef()
	useEffect(() => {
		const getMsg = async () => {
			if (currentChat) {
				const response = await axios.post(recieveMessageRoute, {
					from: curUser._id,
					to: currentChat._id,
				})
				setMessages(response.data)
			}
		}
		getMsg()
	}, [curUser._id, currentChat])

	const handleSendMsg = async (msg) => {
		// 发送信息逻辑：
		// axios的post请求，发送到相应路由
		await axios.post(sendMessageRoute, {
			// 当前聊天对象
			to: currentChat._id,
			// 当前登录用户
			from: curUser._id,
			message: msg,
		})
		socket.current.emit("send-msg", {
			to: currentChat._id,
			from: curUser._id,
			message: msg,
		})
		// 处理自己发送的消息，需要在fromSelf中标记
		const msgs = [...messages]
		msgs.push({ fromSelf: true, message: msg }) //此处的作用是什么？本次输入的消息，标记为自己键入
		setMessages(msgs)
	}

	// 持续监听是否有消息发送过来
	useEffect(() => {
		if (socket.current) {
			socket.current.on("msg-receive", (msg) => {
				setArrivalMessage({
					fromSelf: false,
					messages: msg,
				})
			})
		}
	})

	// 消息发送过来，更新数据，并合并到消息的state中
	useEffect(() => {
		if (arrivalMessage) {
			setMessages((prev) => [...prev, arrivalMessage])
		}
	}, [arrivalMessage])

	// 消息变化时，平滑滚动视图的效果
	// scrollIntoView是自带API
	useEffect(() => {
		scrollRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end",
			inline: "nearest",
		})
	}, [messages])

	return (
		<div>
			<Container>
				<div className="chat-header">
					<div className="user-details">
						<div className="avatar">
							{/* 点选后则被将状态置为被选中 */}
							<Avatar
								src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
								alt="avatar"
								shape="circle"
								size={60}
							/>
						</div>
						<div className="username">
							<h3>{currentChat.username}</h3>
						</div>
					</div>
					<Logout />
				</div>
				<div className="chat-messages">
					{/* <Messages messages={messages}/> */}
					{messages.map((message) => {
						return (
							<div ref={scrollRef} key={uuidv4()}>
								<div
									className={`message ${
										message.fromSelf ? "sended" : "received"
									}`}
								>
									<div className="content">
										<p>{message.message}</p>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				<ChatInput handleSendMsg={handleSendMsg} />
			</Container>
		</div>
	)
}
const Container = styled.div`
	height: 85vh;
	display: grid;
	grid-template-rows: 10% 80% 10%;
	gap: 0.1rem;
	/* overflow: hidden; */
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-rows: 15% 70% 15%;
	}
	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 2rem;
		.user-details {
			display: flex;
			align-items: center;
			gap: 1rem;
			.avatar {
			}
			.username {
				h3 {
					color: white;
				}
			}
		}
	}
	.chat-messages {
		padding: 1rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		overflow: auto;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.message {
			display: flex;
			align-items: center;
			.content {
				max-width: 40%;
				overflow-wrap: break-word;
				padding: 1rem;
				font-size: 1.1rem;
				border-radius: 1rem;
				color: #d1d1d1;
				@media screen and (min-width: 720px) and (max-width: 1080px) {
					max-width: 70%;
				}
			}
		}
		.sended {
			justify-content: flex-end;
			.content {
				background-color: #4f04ff21;
			}
		}
		.recieved {
			justify-content: flex-start;
			.content {
				background-color: #9900ff20;
			}
		}
	}
`
