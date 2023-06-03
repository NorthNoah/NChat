import styled from "styled-components"
import React, { useEffect, useState } from "react"
import Logo from "../assets/logo.svg"
import { Button, notification, Avatar, Spin } from "antd"
// 将contact和curUser传入
export default function Contacts({ contacts, curUser, changeChat }) {
	// 需要存储name image和selected三个状态
	const [curUsername, setCurUsername] = useState("")
	const [curUserImage, setCurUserImage] = useState("")
	const [curSelected, setCurSelected] = useState("")

	// 状态检测：如果存在curUser，设置其头像
	useEffect(() => {
		if (curUser) {
			setCurUserImage(curUser.avatarImage)
			setCurUsername(curUser.username)
		}
	}, [curUser])

	// 切换当前聊天
	const changeCurChat = (index, contact) => {
		// 切换选中的index
		setCurSelected(index)
		// 将当前的contact传入切换当前chat
		changeChat(contact)
	}
	return (
		<div>
			{/* 条件渲染组件：确保当前存在头像和用户名 */}
			{curUserImage &&
				curUserImage(
					<Container>
						<div className="brand">
							<img src={Logo} alt="logo" />
							<h3>NCHAT</h3>
						</div>
						<div className="contacts">
							{contacts.map((contact, index) => {
								// 被选中时，动态CSS类名
								return (
									<div
										className={`contact ${
											index === curSelected ? "curSelected" : ""
										}`}
										key={index}
										onClick={() => changeCurChat(index, contact)}
									>
										<div className="avatar">
											{/* 点选后则被将状态置为被选中 */}
											<Avatar
												src={`data:image/svg+xml;base64,${contact.avatarImage}`}
												alt="avatar"
												key={index}
												size={{
													xs: 24,
													sm: 32,
													md: 40,
													lg: 64,
													xl: 80,
													xxl: 100,
												}}
												shape="circle"
											/>
										</div>
										<div className="username">
											<h3>{contact.username}</h3>
										</div>
									</div>
								)
							})}
						</div>
						<div className="cur-user">
							<div className="avatar">
								{/* 点选后则被将状态置为被选中 */}
								<Avatar
									src={`data:image/svg+xml;base64,${curUserImage}`}
									alt="avatar"
									size={{
										xs: 24,
										sm: 32,
										md: 40,
										lg: 64,
										xl: 80,
										xxl: 100,
									}}
									shape="circle"
								/>
							</div>
							<div className="username">
								<h2>{curUsername}</h2>
							</div>
						</div>
					</Container>
				)}
		</div>
	)
}
const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;
`
