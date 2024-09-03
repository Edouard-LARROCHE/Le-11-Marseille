import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import picturesData from "../../data/picturesData"

import "./cardEffect.scss"

const CardEffect = () => {
	const navigate = useNavigate()

	const [contentChange, setContentChange] = useState(null)

	const selectedImageIds = [
		{ key: "neighborhood", image: picturesData.neighborhood[0] },
		{ key: "balcony", image: picturesData.balcony[1] },
		{ key: "box", image: picturesData.box[0] },
		{ key: "room", image: picturesData.room[1] },
		{ key: "neighborhood", image: picturesData.neighborhood[1] },
		{ key: "balcony", image: picturesData.balcony[0] },
	]

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
			{selectedImageIds.map((item, index) => (
				<div
					key={item.image.id}
					className="card"
					style={{ zIndex: index }}
					onMouseOver={(e) => handleMouseOver(e, index)}
					onMouseOut={(e) => handleMouseOut(e, index)}
					onClick={() => handleCardClick(item.key)}
				>
					<img
						className={`${contentChange === index ? "filter" : ""}`}
						src={item.image.imageUrl}
						alt={item.image.title}
					/>
					{contentChange === index && (
						<>
							<div className="title">{item.image.title}</div>
							<p>Voir la galerie</p>
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default CardEffect

