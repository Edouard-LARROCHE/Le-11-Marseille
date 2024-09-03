import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { shuffleArray } from "../../utils/utils"

import picturesData from "../../data/picturesData"

import "./cardEffect.scss"

const CardEffect = () => {
	const navigate = useNavigate()

	const [contentChange, setContentChange] = useState(null)
	const [selectedImages, setSelectedImages] = useState([])

	useEffect(() => {
		const allImages = getAllImages()
		const shuffledImages = shuffleArray(allImages).slice(0, 6)
		setSelectedImages(shuffledImages)
	}, [])

	const getAllImages = () => {
		return Object.values(picturesData).flat()
	}

	const handleMouseOver = (e, index) => {
		const card = e.currentTarget
		card.style.zIndex = 10
		card.style.transform = `rotate(0deg) scale(1.1)`

		setContentChange(index)
	}

	const handleMouseOut = (e, index) => {
		const card = e.currentTarget
		card.style.zIndex = index
		card.style.transform = `scale(1)`

		setContentChange(null)
	}

	const handleCardClick = (key) => {
		navigate(`/image/${key}`)
	}

	return (
		<div className="card-container">
			<p className="title">Accéder à la galerie photo</p>
			{selectedImages.map((item, index) => (
				<div
					key={item.id}
					className="card"
					style={{ zIndex: index }}
					onMouseOver={(e) => handleMouseOver(e, index)}
					onMouseOut={(e) => handleMouseOut(e, index)}
					onClick={() => handleCardClick(item.key)}
				>
					<img
						className={`${contentChange === index ? "filter" : ""}`}
						src={item.imageUrl}
						alt={item.title}
					/>
					{contentChange === index && (
						<>
							<div className="title">{item.title}</div>
							<p>Voir la galerie</p>
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default CardEffect

