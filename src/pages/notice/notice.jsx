import React, { useEffect, useState } from "react"

import { getAllNotices } from "../../server/server"

import CardNoticeCarousel from "./components/cardNoticeCarousel"

import "./notice.scss"

const Notice = () => {
	const [cardsData, setCardsData] = useState([])

	useEffect(() => {
		getAllNotices().then((res) => {
			setCardsData(res)
		})
	}, [])

	const validatedNotices = cardsData.filter((card) => card.isValided)

	const ratings = cardsData.length && cardsData.map((card) => card.rating)
	const average =
		cardsData.length &&
		ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length

	return validatedNotices.length > 0 ? (
		<div className="container-notice">
			<p className="title-notice">
				Vos <span className="highlight">avis</span>
				<span className="average">
					{average && average.toFixed(1)}/5
				</span>
			</p>
			<CardNoticeCarousel data={cardsData} />
		</div>
	) : null
}

export default Notice

