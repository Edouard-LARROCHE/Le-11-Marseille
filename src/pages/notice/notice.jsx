import React, { useEffect, useState } from "react"

import { getAllClients, getNoticesByUserId } from "../../server/server"

import CardNoticeCarousel from "./components/cardNoticeCarousel"

import "./notice.scss"

const Notice = () => {
	const [clientsIds, setClientsIds] = useState([])
	const [cardsData, setCardsData] = useState([])

	useEffect(() => {
		getAllClients().then((res) => {
			const _ids = res.map((client) => client._id)
			setClientsIds(_ids)
		})
	}, [])

	useEffect(() => {
		if (clientsIds.length) {
			getNoticesByUserId(clientsIds[0]).then((res) => {
				setCardsData(res)
			})
		}
	}, [clientsIds])

	const ratings = cardsData.length && cardsData.map((card) => card.valueRate)
	const average =
		cardsData.length &&
		ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length

	return cardsData.length ? (
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

