import React, { memo, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
const Home = () => {
	const navigate = useNavigate()
	const [username, setUsername] = useState("")
	const handSumbit = (e: any) => {
		e.preventDefault()
		localStorage.setItem("username", username)
		navigate("/chat")
	}
	return (
		<Container className="home">
			<form onSubmit={handSumbit}>
				<h2 style={{ marginBottom: "30px", textAlign: "center" }}>登录聊天</h2>
				<label htmlFor="username">用户名: </label>
				<Input
					type="text"
					minLength={6}
					name="username"
					id="username"
					className="username_input"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				></Input>
				<div>
					<button type="submit">
						登录
					</button>
				</div>
			</form>
		</Container>
	)
}

const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`
const Input = styled.input`
	padding: 10px;
	width: 50%;
`

export default Home
