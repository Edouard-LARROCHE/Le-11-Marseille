import React, { useState } from "react"

import Title from "../../components/title"

import IMGSejour from "../../assets/images/PHOTOS Le 11 VERSION 2 copie/SEJOUR/IMG_3283.jpg"

import "./home.scss"

const Home = () => {
	return (
		<div className="homePage">
			<div className="containerImage">
				<img src={IMGSejour} alt="Marseille" />
			</div>
			<Title />
		</div>
	)
}

export default Home

