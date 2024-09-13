import React from "react"
import { useParams } from "react-router-dom"

import Nav from "../header/nav"
import Carousel from "../../components/carousel/carousel"
import Footer from "../footer/footer"

import LogoLe11 from "../../assets/logo/le11.svg?react"

import picturesData from "../../data/picturesData"

import "./imagePages.scss"

const ImagePage = () => {
	const { key } = useParams()

	const images = picturesData[key] || []
	const item = images[0]

	return (
		<div className="image-page">
			<Nav />
			<LogoLe11 className="logo" />
			<div className="container-text">
				<h2>{item?.title}</h2>
				<p>{item?.desc}</p>
			</div>
			<div className="carousel-container">
				<Carousel images={images} />
			</div>
			<Footer />
		</div>
	)
}

export default ImagePage

