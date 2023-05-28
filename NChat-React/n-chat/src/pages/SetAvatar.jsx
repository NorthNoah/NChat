import styled from "@emotion/styled"
import { UserOutlined } from "@ant-design/icons"
import React, { useEffect, useState } from "react"
import { Button, Form, Input, notification, Avatar } from "antd"
import Loader from "../assets/loader.gif"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { setAvatarRoute } from "../utils/APIRoutes"
import { Buffer } from "buffer"
export default function SetAvatar() {
	const api = `https://api.multiavatar.com/4645646`
	const navigate = useNavigate()
	const [avatars, setAvatars] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [selectedAvatar, setSelectedAvatars] = useState(undefined)
	useEffect(() => {
        // 异步函数要进行封装后再执行，不能直接传入异步函数
		const randomAvatar = async () => {
			const data = []
			for (let i = 0; i < 4; i++) {
				const image = await axios.get(
					`${api}/${Math.round(Math.random() * 1000)}`
				)
				const buffer = new Buffer(image.data)
                // 将buffer转换为base64字符串
				data.push(buffer.toString("base64"))
			}
			setAvatars(data)
			setIsLoading(false)
		}
        randomAvatar()
	}, [])

	return (
		<div>
			<Container>
                <div className="title-container">
                    <h1></h1>
                </div>
				<Avatar size={64} icon={<UserOutlined />}></Avatar>
			</Container>
		</div>
	)
}
const Container = styled.div``
