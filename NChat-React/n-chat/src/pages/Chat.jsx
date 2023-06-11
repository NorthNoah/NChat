import styled from "@emotion/styled"
import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { allUsersRoute, host } from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatContainer from "../components/ChatContainer"
import { Socket, io } from 'socket.io-client'

export default function Chat() {
	const [contacts, setContacts] = useState([])
	const [curUser, setCurUser] = useState(undefined)
	const [currentChat, setCurrentChat] = useState(undefined)
	const navigate = useNavigate()
	// 创建套接字
	const socket = new useRef()

	// 异步和同步代码的区别是什么？
	useEffect(() => {
		const setUser = async () => {
			// if (!localStorage.getItem("NChat-user")) {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
				navigate("/login")
			} else {
				// 必须为异步，setCurUser顺序要在setContact前
				// setCurUser(await JSON.parse(localStorage.getItem("NChat-user")))
				setCurUser(
					await JSON.parse(
						localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
					)
				)
			}
		}
		setUser()
	}, [])

	// 创建套接字,且当目前用户切换时，重新触发effect
	useEffect(() => {
		if (curUser) {
			socket.current = io(host)
			// 传递当前用户id，添加到后端的全局map中
			socket.current.emit("add-user", curUser._id)
		}
	}, [curUser])

	useEffect(() => {
		const setCurContact = async () => {
			if (curUser) {
				if (curUser.isAvatarImageSet) {
					const data = await axios.get(`${allUsersRoute}/${curUser._id}`)
					setContacts(data.data)
				} else {
					navigate("/setAvatar")
				}
			}
		}
		setCurContact()
	}, [curUser])

	const handleChatChange = (chat) => {
		setCurrentChat(chat)
	}

	// 使用socket：为每一个登录用户创建一个新的socket连接
	return (
		<>
			<Container>
				<div className="container">
					<Contacts
						contacts={contacts}
						curUser={curUser}
						changeChat={handleChatChange}
					/>
					{currentChat === undefined ? (
						<Welcome />
					) : (
						<ChatContainer currentChat={currentChat} curUser={curUser} socket={socket}/>
					)}
				</div>
			</Container>
		</>
	)
}

const Container = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.container {
		height: 85vh;
		width: 85vw;
		background-color: #00000076;
		display: grid;
		grid-template-columns: 25% 75%;
		/* 媒体查询实现 */
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			/* 平板电脑 */
			grid-template-columns: 35% 65%;
		}
	}
`
