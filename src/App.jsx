import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ScrollProvider } from "./Context"

import ScrollToTop from "./components/scrollToTop/scrollToTop.jsx"

import Home from "./pages/home/home.jsx"
import ImagePage from "./pages/imagePages/imagePages.jsx"
import Confidentiality from "./pages/confidentiality/confidentiality.jsx"
import Cgl from "./pages/CGL/cgl.jsx"
import LegalNotices from "./pages/legalNotices/legalNotices.jsx"

function App() {
	return (
		<div className="App">
			<Router>
				<ScrollToTop />
				<ScrollProvider>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/image/:key" element={<ImagePage />} />
						<Route
							path="/confidentiality"
							element={<Confidentiality />}
						/>
						<Route path="/cgl" element={<Cgl />} />
						<Route
							path="/legalNotices"
							element={<LegalNotices />}
						/>
					</Routes>
				</ScrollProvider>
			</Router>
		</div>
	)
}

export default App

