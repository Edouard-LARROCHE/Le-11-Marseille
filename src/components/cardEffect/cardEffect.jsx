import React from "react"
import { useNavigate } from "react-router-dom"

import IMGImmeuble from "../../assets/images/pictures/L'IMMEUBLE/IMG_2628.jpg"

import "./cardEffect.scss"

const CardEffect = () => {
	const navigate = useNavigate()

	const images = {
		1: IMGImmeuble,
		2: IMGImmeuble,
		3: IMGImmeuble,
		4: IMGImmeuble,
		5: IMGImmeuble,
		6: IMGImmeuble,
	}

	const handleMouseOver = (e) => {
		const card = e.currentTarget
		card.style.zIndex = 10
		card.style.transform = `rotate(0deg) scale(1.1)`
	}

	const handleMouseOut = (e, index) => {
		const card = e.currentTarget
		card.style.zIndex = index
		card.style.transform = `scale(1)`
	}

	const handleCardClick = (id) => {
		navigate(`/image/${id}`)
	}

	return (
		<div className="card-container">
			{Object.keys(images).map((id, index) => (
				<div
					key={id}
					className="card"
					style={{ zIndex: index }}
					onMouseOver={(e) => handleMouseOver(e, index)}
					onMouseOut={(e) => handleMouseOut(e, index)}
					onClick={() => handleCardClick(id)}
				>
					<img src={images[id]} alt="Marseille" />
				</div>
			))}
		</div>
	)
}

export default CardEffect

