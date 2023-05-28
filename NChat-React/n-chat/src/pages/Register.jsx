import styled from "@emotion/styled"
import React, { useState } from "react"
import { Button, Form, Input, notification } from "antd"
import Logo from "../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { registerRoute } from "../utils/APIRoutes"

export default function Register() {
  const navigate = useNavigate()
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 32 },
	}
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	})

	// 处理form表单完成时的回调
	const onFinish = async (event) => {
		const { password, confirmPassword, username, email } = values
    // post注册信息，返回体中包含注册成功/失败信息
		const { data } = await axios({
			method: "post",
			url: registerRoute,
			data: {
				password,
				username,
				email,
				confirmPassword
			},
		})
    if (data.status === false) {
      openNotification(data.msg)
    }
    if (data.status === true) {
      localStorage.setItem('NChat-user', JSON.stringify(data.user))
      navigate("/")
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
			onClick: () => {
				console.log("Notification Clicked!")
			},
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
						rules={[
							{ required: true, message: "请输入你的用户名!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("username").length >= 3) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error("用户名长度需要在3个字符以上~")
									)
								},
							}),
						]}
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
						name="email"
						rules={[{ required: true, message: "请输入你的邮箱!" }]}
					>
						<Input
							className="input"
							type="text"
							placeholder="邮箱"
							name="email"
							onChange={(e) => onChange(e)}
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{ required: true, message: "请输入你的密码!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password").length >= 8) {
										return Promise.resolve()
									}
									return Promise.reject(new Error("密码长度需要在8个字符以上"))
								},
							}),
						]}
					>
						<Input
							type="password"
							className="input"
							placeholder="密码"
							name="password"
							onChange={(e) => onChange(e)}
						/>
					</Form.Item>
					<Form.Item
						name="confirmPassword"
						rules={[
							{ required: true, message: "请确认你的密码!" },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue("password") === value) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error("两次输入的密码不一致哟，请重新输入~")
									)
								},
							}),
						]}
					>
						<Input
							type="password"
							className="input"
							placeholder="确认密码"
							name="confirmPassword"
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
							创建用户
						</Button>
						<div className="tip">
							已有账户？去<Link to="/login">登录</Link>
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
