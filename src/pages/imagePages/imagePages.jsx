import React from "react"
import { useParams, useNavigate } from "react-router-dom"

import IMGImmeuble from "../../assets/images/pictures/L'IMMEUBLE/IMG_2628.jpg"

import "./imagePages.scss"

const images = {
	1: IMGImmeuble,
	2: IMGImmeuble,
	3: IMGImmeuble,
	4: IMGImmeuble,
	5: IMGImmeuble,
	6: IMGImmeuble,
}

const ImagePage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const imageUrl = images[id]

	const handleClose = () => {
		navigate(-1)
	}

	return (
		<div className="image-page">
			<button onClick={handleClose}>Close</button>
			<div className="image-container">
				<img src={imageUrl} alt={`Large view ${id}`} />
			</div>
		</div>
	)
}

export default ImagePage

