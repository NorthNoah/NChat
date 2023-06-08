import styled from "styled-components"
import React, { useEffect, useState } from "react"
import { SmileOutlined, SendOutlined } from "@ant-design/icons"
import Picker from "emoji-picker-react"
export default function ChatInput({handleSendMsg}) {
	const [msg, setMsg] = useState("")
	const [showEmojiPicker, setShowEmojiPicker] = useState(false)
	const handleEmojiPicker = () => {
		setShowEmojiPicker(!showEmojiPicker)
	}
	const handleEmojiClick = (emojiObj) => {
		let message = msg
		message += emojiObj.emoji
		setMsg(message)
	}

  // submit-sendChat
	const sendChat = (e) => {
    e.preventDefault()
    if (msg.length > 0) {
      // handleSendMsg：从父组件传入
      handleSendMsg(msg);
      setMsg("");
    }
  }
  


	return (
		<Container>
			<div className="button-container">
				<div className="emoji">
					<SmileOutlined onClick={handleEmojiPicker} />
					{/* 控制显示/隐藏表情框 */}
					{showEmojiPicker && (
						<Picker
							onEmojiClick={handleEmojiClick}
							className="emoji-picker-react"
						/>
					)}
				</div>
			</div>
			<form className="input-container" onSubmit={(e) => sendChat(e)}>
				<input
					type="text"
					placeholder="说点什么吧"
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
				/>
				<button className="sumbit" type="sumbit">
					<SendOutlined />
				</button>
			</form>
		</Container>
	)
}
const Container = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 5% 95%;
	background-color: #080420;
	padding: 0 2rem;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		padding: 0 1rem;
		gap: 1rem;
	}
	.button-container {
		display: flex;
		align-items: center;
		color: white;
		gap: 1rem;
		.emoji {
			position: relative;
			svg {
				font-size: 1.5rem;
				color: #ffff00c8;
				cursor: pointer;
			}
			.EmojiPickerReact {
				position: absolute;
				top: -30rem;
				background-color: #080420;
				box-shadow: 0 5px 10px #9a86f3;
				border-color: #9a86f3;
				.emoji-scroll-wrapper::-webkit-scrollbar {
					background-color: #080420;
					width: 5px;
					&-thumb {
						background-color: #9a86f3;
					}
				}
				.emoji-categories {
					button {
						filter: contrast(0);
					}
				}
				.emoji-search {
					background-color: transparent;
					border-color: #9a86f3;
				}
				.emoji-group:before {
					background-color: #080420;
				}
			}
		}
	}
	.input-container {
		width: 100%;
		height: 60%;
		border-radius: 2rem;
		display: flex;
		align-content: center;
		gap: 2rem;
		background-color: #ffffff34;
		input {
			width: 90%;
			height: 90%;
			background-color: transparent;
			color: white;
			border: none;
			padding-left: 1rem;
			font-size: 1.2rem;
			&::selection {
				background-color: #9a86f3;
			}
			&:focus {
				outline: none;
			}
		}
		button {
			padding: 0.3rem 2rem;
			border-radius: 2rem;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #9a86f3;
			border: none;
			@media screen and (min-width: 720px) and (max-width: 1080px) {
				padding: 0.3rem 1rem;
				svg {
					font-size: 1rem;
				}
			}
			svg {
				font-size: 2rem;
				color: white;
			}
		}
	}
`
