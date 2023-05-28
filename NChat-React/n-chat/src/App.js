import socketIO from "socket.io-client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from './pages/Chat'
// const socket = socketIO.connect("http://localhost:6000")

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Chat />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
