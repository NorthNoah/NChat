import React from "react"
import styled from "styled-components"

export default function Messages({ messages }) {
  console.log(messages)
	return (
		<Container>
			{messages.map((message) => {
				return (
					<div
						className={`message ${message.fromSelf ? "sended" : "received"}`}
					>
						<div className="content">
							<p>{message.message}</p>
						</div>
					</div>
				)
			})}
		</Container>
	)
}
const Container = styled.div`
	height: 100%;
`
