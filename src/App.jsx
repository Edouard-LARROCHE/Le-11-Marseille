import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { AnimationProvider } from "./Context"

import Home from "./pages/home/home.jsx"
import ImagePage from "./pages/imagePages/imagePages.jsx"

function App() {
	return (
		<div className="App">
			<Router>
				<AnimationProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/image/:key" element={<ImagePage />} />
					</Routes>
				</AnimationProvider>
			</Router>
		</div>
	)
}

export default App

