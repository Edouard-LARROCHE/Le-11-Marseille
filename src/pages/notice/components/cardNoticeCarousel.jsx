import React from "react"

import CardNotice from "../../../components/card/card"

import "./scss/cardNoticeCarousel.scss"

const CardNoticeCarousel = ({ data }) => {
	return (
		<div className="carousel-container">
			<div className="carousel">
				{data.map((item, index) => (
					<CardNotice key={index} item={item} index={index} />
				))}
			</div>
		</div>
	)
}

export default CardNoticeCarousel

