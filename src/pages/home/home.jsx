import React, { useState } from "react"

import Header from "../header/header"
import PictureHome from "../../components/pictureHome/pictureHome"

import "./home.scss"

const Home = () => {
	return (
		<div className="homePage">
			{/* <Header /> */}
			<div className="container">
				<PictureHome />
			</div>
		</div>
	)
}

export default Home

