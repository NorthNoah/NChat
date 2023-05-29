import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Button, Form, Input, notification } from "antd"
import Logo from "../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { loginRoute } from "../utils/APIRoutes"

export default function Login() {
	const REACT_APP_LOCALHOST_KEY = "NChat-current-user"
	// 登录状态识别,若有登录状态的字段则直接跳转到聊天界面
	useEffect(() => {
		if (localStorage.getItem("NChat-user")) {
			navigate("/")
		}
	}, [])
	const navigate = useNavigate()
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 32 },
	}
	const [values, setValues] = useState({
		username: "",
		password: "",
	})
	const validateForm = () => {
		const { username, password } = values
		if (username === "") {
			const usernameMsg = "需要输入正确的用户名~"
			openNotification(usernameMsg)
			notification(usernameMsg)
			return false
		} else if (password === "") {
			const passwordMsg = "需要输入正确的密码~"
			openNotification(passwordMsg)
			notification(passwordMsg)
			return false
		}
		return true
	}
	// 处理form表单完成时的回调
	const onFinish = async (event) => {
		if (validateForm()) {
			const { password, username } = values
			// post注册信息，返回体中包含注册成功/失败信息
			const { data } = await axios({
				method: "post",
				url: loginRoute,
				data: {
					password,
					username,
				},
			})
			if (data.status === false) {
				openNotification(data.msg)
			}
			if (data.status === true) {
				localStorage.setItem(
					"NChat-user",
					JSON.stringify(data.user)
				)
				navigate("/")
			}
		}
	}
	// 处理input变化时的回调,进行setValues
	const onChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
		})
	}

	const openNotification = (msg) => {
		notification.open({
			message: "Tips",
			description: msg,
		})
	}

	return (
		<div>
			<FormContainer>
				<Form {...layout} onFinish={onFinish} className="form">
					<Form.Item>
						<div className="brand">
							<img src={Logo} alt="LOGO" />
							<h1>NChat</h1>
						</div>
					</Form.Item>
					<Form.Item
						name="username"
						rules={[{ required: true, message: "请输入你的用户名!" }]}
					>
						<Input
							className="input"
							type="text"
							placeholder="用户名"
							name="username"
							onChange={(e) => onChange(e)}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: "请输入你的密码!" }]}
					>
						<Input
							type="password"
							className="input"
							placeholder="密码"
							name="password"
							onChange={(e) => onChange(e)}
						/>
					</Form.Item>
					<Form.Item>
						<Button
							// type="primary"
							htmlType="submit"
							className="button"
							block="true"
							size="large"
						>
							登录
						</Button>
						<div className="tip">
							没有账户？去<Link to="/register">注册</Link>
						</div>
					</Form.Item>
				</Form>
			</FormContainer>
		</div>
	)
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;

	.brand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}

	.form {
		width: 28rem;
		display: flex;
		flex-direction: column;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;
	}
	.input {
		background-color: transparent;
		padding: 0.8rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
		&::placeholder {
			color: grey;
		}
	}
	.button {
		background-color: #4e0eff;
		color: white;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		&:hover {
			background-color: #4e0eff;
		}
	}
	.tip {
		margin-top: 1rem;
		text-align: center;
		color: white;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
	}
`
