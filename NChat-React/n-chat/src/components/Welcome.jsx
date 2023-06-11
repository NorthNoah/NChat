import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Robot from "../assets/robot.gif"
export default function Welcome() {
	const [username, setUsername] = useState("")
	useEffect(() => {
		const setCurName = async () => {
			setUsername(
        // await JSON.parse(localStorage.getItem("NChat-user")).username
				await JSON.parse(
					localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
				).username
      )
		}
		setCurName()
	})
	return (
		<div>
			<Container>
				<img src={Robot} alt="" />
				<h1>
					你好啊, <span>{username}!</span>
				</h1>
				<h3>请选择一个联系人开始聊天吧</h3>
			</Container>
		</div>
	)
}
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	flex-direction: column;
	img {
		height: 20rem;
	}
	span {
		color: #4e0eff;
	}
  h3 {
    margin-top: 1rem;
  }
`
