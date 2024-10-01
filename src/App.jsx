import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ScrollProvider } from "./Context"

import ScrollToTop from "./components/scrollToTop/scrollToTop.jsx"

import Loader from "./components/loader/loader.jsx"
import Home from "./pages/home/home.jsx"
import ImagePage from "./pages/imagePages/imagePages.jsx"
import Confidentiality from "./pages/confidentiality/confidentiality.jsx"
import Cgl from "./pages/CGL/cgl.jsx"
import LegalNotices from "./pages/legalNotices/legalNotices.jsx"

import AdminLogin from "./pages/admin/adminLogin.jsx"
import AdminPage from "./pages/admin/adminPage.jsx"

import IMGSejour from "/images/livingRoom/PAGE_1.jpg"

function App() {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = IMGSejour
		img.onload = () => setIsImageLoaded(true)
	}, [])

	if (!isImageLoaded) {
		return <Loader />
	}

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
						<Route
							path={`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`}
							exact
							element={<AdminLogin />}
						/>
						<Route
							path={`/${import.meta.env.VITE_API_PATH_ADMIN}`}
							exact
							element={<AdminPage />}
						/>
					</Routes>
				</ScrollProvider>
			</Router>
		</div>
	)
}

export default App

