import socketIO from "socket.io-client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home.tsx'
import ChatPage from './components/Home.tsx'
const socket = socketIO.connect("http://localhost:6000")

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
