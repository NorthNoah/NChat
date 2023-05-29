import socketIO from "socket.io-client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ErrorFallback } from "./components/ErrorBoundary"
import { ErrorBoundary } from "react-error-boundary"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Chat from "./pages/Chat"
import SetAvatar from "./pages/SetAvatar"

// const socket = socketIO.connect("http://localhost:6000")

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<BrowserRouter>
				<div className="App">
					<Routes>
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/setAvatar" element={<SetAvatar />} />
						<Route path="/" element={<Chat />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ErrorBoundary>
	)
}

export default App
