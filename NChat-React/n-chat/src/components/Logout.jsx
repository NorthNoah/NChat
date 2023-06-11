import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "antd"
import { PoweroffOutlined } from "@ant-design/icons"
import styled from "styled-components"
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";


export default function Logout() {
	const navigate = useNavigate()
	const handleClick = async () => {
		const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
		const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
	}
	return (
		<ButtonContainer>
			<Button
				icon={<PoweroffOutlined style={{ color: '#ebe7ff' }}/>}
				shape="circle"
				onClick={handleClick}
				className="power-btn"
			></Button>
		</ButtonContainer>
	)
}
const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	.power-btn {
		background-color: #9a86f3;
	}
`
