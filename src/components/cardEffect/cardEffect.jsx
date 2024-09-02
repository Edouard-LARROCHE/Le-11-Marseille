import React from "react"

import "./cardEffect.scss"

const CardEffect = () => {
	const cards = [
		{ id: 1, color: "#FF5733" },
		{ id: 2, color: "#33FF57" },
		{ id: 3, color: "#3357FF" },
		{ id: 4, color: "#F333FF" },
		{ id: 5, color: "#FF33B5" },
	]

	const handleMouseOver = (e) => {
		const card = e.currentTarget
		card.style.zIndex = 10
		card.style.transform = `rotate(0deg) scale(1.1)`
	}

	const handleMouseOut = (e, index) => {
		const card = e.currentTarget
		card.style.zIndex = index
		card.style.transform = `rotate(${(index - 2) * 10}deg) scale(1)`
	}

	return (
		<div className="card-container">
			{cards.map((card, index) => (
				<div
					key={card.id}
					className="card"
					style={{ backgroundColor: card.color, zIndex: index }}
					onMouseOver={(e) => handleMouseOver(e, index)}
					onMouseOut={(e) => handleMouseOut(e, index)}
				/>
			))}
		</div>
	)
}

export default CardEffect

