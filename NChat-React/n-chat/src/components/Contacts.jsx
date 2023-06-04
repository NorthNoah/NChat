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
		console.log(contacts)
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
			{curUserImage && curUsername && (
				<Container>
					<div className="brand">
						<img src={Logo} alt="logo" />
						<h2>NCHAT</h2>
					</div>
					<div className="contacts">
						{contacts.map((contact, index) => {
							// 被选中时，动态CSS类名
							return (
								<div
									className={`contact ${
										index === curSelected ? "selected" : ""
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
											className="img"
											shape="circle"
											size={48}
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
								shape="circle"
								size={60}
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
	height: 85vh;
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;
	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		img {
			height: 2.5rem;
		}
		h2 {
			color: white;
		}
	}
	.contacts {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: auto;
		gap: 0.8rem;
		&::-webkit-scrollbar {
			width: 0.2rem;
			&-thumb {
				background-color: #ffffff39;
				width: 0.1rem;
				border-radius: 1rem;
			}
		}
		.contact {
			background-color: #ffffff34;
			min-height: 5rem;
			cursor: pointer;
			width: 90%;
			border-radius: 0.2rem;
			padding: 0.4rem;
			display: flex;
			gap: 1rem;
			align-items: center;
			transition: 0.5s ease-in-out;
			.username {
				h3 {
					color: white;
				}
			}
		}
		.selected {
			background-color: #9a86f3;
		}
	}
	.cur-user {
		background-color: #0d0d30;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		.avatar {
			img {
				height: 4rem;
				max-inline-size: 100%;
			}
		}
		.username {
			h2 {
				color: white;
			}
		}
		@media screen and (min-width: 720px) and (max-width: 1080px) {
			gap: 0.5rem;
			.username {
				h2 {
					font-size: 1rem;
				}
			}
		}
	}
`
