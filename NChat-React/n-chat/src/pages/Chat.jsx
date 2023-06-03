import styled from '@emotion/styled'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUsersRoute } from '../utils/APIRoutes'
import Contacts from '../components/Contacts'


export default function Chat() {
  const [contacts, setContacts] = useState([])
  const [curUser, setCurUser] = useState(undefined)
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate()
  // 异步和同步代码的区别是什么？
  useEffect(() => {
      const setUser = async () => {
        if (!localStorage.getItem("NChat-user")) {
          navigate('/login')
        } else {
          // 必须为异步，setCurUser顺序要在setContact前
          setCurUser(await JSON.parse(localStorage.getItem("NChat-user")))
        }
      }
      setUser()
	}, [])

  useEffect(() => {
    const setCurContact = async () => {
      if (curUser) {
        // 如果已经设置了头像
        const data = await axios({
          method: "get",
          url: `${allUsersRoute}/${curUser._id}`
        })
        setContacts(data.data)
      } else {
        // navigate("/setAvatar")
      }
    }
    setCurContact()
  },[curUser]) 
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  }
  return (
    <>
    <Container>
      <div className="chat-container">
        <Contacts contacts={contacts}/>
        <div>ss12</div>
      </div>
      <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
        </div>
    </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .chat-container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    /* 媒体查询实现 */
    @media screen and (min-width: 720px) and (max-width: 1080px){
      /* 平板电脑 */
      grid-template-columns: 35% 65%;

    }
  }
`