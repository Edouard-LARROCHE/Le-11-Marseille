import React from "react"
import { useParams, useNavigate } from "react-router-dom"

import Carousel from "../../components/carousel/carousel"

import Cross from "../../assets/icons/cross.svg?react"
import LogoLe11 from "../../assets/logo/le11.svg?react"

import picturesData from "../../data/picturesData"

import "./imagePages.scss"

const ImagePage = () => {
	const { key } = useParams()
	const navigate = useNavigate()

	const images = picturesData[key] || []

	const handleClose = () => {
		navigate(-1)
	}

	return (
		<div className="image-page">
			<LogoLe11 className="logo" />
			<Cross className="cross" onClick={handleClose} />
			<div className="carousel-container">
				<Carousel images={images} />
			</div>
		</div>
	)
}

export default ImagePage

