import React,{useEffect} from "react"
import styled from "styled-components"
import { Avatar } from "antd"
import Logout from "./Logout"
import { useNavigate } from "react-router-dom"
import ChatInput from "./ChatInput"

export default function ChatContainer({ currentChat={} }) {
  const handleSendMsg = async (msg) => {
    
  }
	return (
		<div>
			<Container>
				<div className="chat-header">
					<div className="user-details">
						<div className="avatar">
							{/* 点选后则被将状态置为被选中 */}
							<Avatar
								src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
								alt="avatar"
								shape="circle"
								size={60}
							/>
						</div>
						<div className="username">
              <h3>{currentChat.username}</h3>
            </div>
					</div>
          <Logout/>
				</div>
        <div className="chat-messages"></div>
        <div className="chat-input"></div>
        <ChatInput handleSendMsg={handleSendMsg}/>
			</Container>
		</div>
	)
}
const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {

      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`
