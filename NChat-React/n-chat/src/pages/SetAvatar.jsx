import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Button, notification, Avatar, Spin } from "antd"
import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { service } from "../utils/myAxios"
import { setAvatarRoute } from "../utils/APIRoutes"
import { Buffer } from "buffer"
import axios from "axios"
export default function SetAvatar() {
	const api = `https://api.multiavatar.com/4645646`
	const REACT_APP_LOCALHOST_KEY = "NChat-current-user"
	const navigate = useNavigate()
	const [avatars, setAvatars] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [selectedAvatar, setSelectedAvatar] = useState(undefined)
	// useEffect(() => {
	// 	if (!localStorage.getItem("NChat-user")) {
	// 		navigate('/login')
	// 	}
	// })
	useEffect(() => {
		const isLogin = async () => {
			if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
				navigate("/login")
		}
		isLogin()
	}, [])

	useEffect(() => {
		// 异步函数要进行封装后再执行，不能直接传入异步函数
		const randomAvatar = async () => {
			const data = []
			for (let i = 0; i < 4; i++) {
				// const image = await axios.get(
				// 	`${api}/${Math.round(Math.random() * 1000)}/`
				// )
				// const image = await axios({
				// 	method: "get",
				// 	url: `${api}/${Math.round(Math.random() * 1000)}/`,
				// }).catch((err) => {
				// 	console.log("Axios error on url: " + this.url, " --> " + err)
				// })
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`
				)
				try {
				} catch (error) {}
				const buffer = new Buffer(image.data)
				// 将buffer中的image.data转换为base64字符串
				data.push(buffer.toString("base64"))
			}
			setAvatars(data)
			setIsLoading(false)
		}
		randomAvatar()
	}, [])

	const openNotification = (msg) => {
		notification.open({
			message: "Tips",
			description: msg,
		})
	}
	const setProfilePicture = async () => {
		if (selectedAvatar === undefined) {
			const avatarMsg = "请先选择一个头像！"
			openNotification(avatarMsg)
		} else {
			// 取出本地存储中的user对象
			// const user = await JSON.parse(localStorage.getItem("NChat-user"))
			const user = await JSON.parse(
				localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
			)
			const { data } = await axios({
				method: "post",
				// 注意要提交到对应id的user里
				url: `${setAvatarRoute}/${user._id}/`,
				data: {
					image: avatars[selectedAvatar],
				},
			})
			console.log(data)
			// 数据已经设置
			if (data.isSet) {
				user.isAvatarImageSet = true
				user.avatarImage = data.image
				// localStorage.setItem("NChat-user", JSON.stringify(user))
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(user)
				)
				navigate("/")
			} else {
				openNotification("设置头像失败，请重试！")
			}
		}
	}

	return (
		<div>
			{/* 性能优化：Loader */}
			{isLoading ? (
				<Container>
					<Spin size="large"></Spin>
				</Container>
			) : (
				<Container>
					<div className="title-container">
						<h1>选一个作为你的个人头像</h1>
					</div>
					<div className="avatars">
						{/* map遍历展示avatars中的数据 */}
						{avatars.map((avatar, index) => {
							return (
								<div
									className={`avatar ${
										selectedAvatar === index ? "selected" : ""
									}`}
								>
									{/* 点选后则被将状态置为被选中 */}
									<Avatar
										src={`data:image/svg+xml;base64,${avatar}`}
										alt="avatar"
										key={index}
										onClick={() => setSelectedAvatar(index)}
										size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
										shape="circle"
									/>
								</div>
							)
						})}
					</div>
					<Button
						htmlType="submit"
						className="button"
						size="large"
						onClick={() => setProfilePicture()}
					>
						设置为你的头像
					</Button>
				</Container>
			)}
		</div>
	)
}
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
	.title-container {
		h1 {
			color: white;
		}
	}
	.avatars {
		display: flex;
		justify-content: center;
		gap: 2rem;
		cursor: pointer;
		.avatar {
			border: 0.4rem solid transparent;
			border-radius: 5rem;
			padding: 0.4rem;
			display: flex;
			justify-content: center;
			align-items: center;
			transition: 0.5s ease-in-out;
		}
		.selected {
			border: 0.4rem solid #4e0eff;
		}
	}
	.button {
		background-color: #4e0eff;
		color: white;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		padding: 0.5rem 2rem;
		height: 4rem;
		&:hover {
			background-color: #4e0eff;
		}
	}
`
