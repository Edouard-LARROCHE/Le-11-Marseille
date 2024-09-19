import React from "react"

import CardNoticeCarousel from "./components/cardNoticeCarousel"

import "./notice.scss"

const Notice = () => {
	const cardsData = [
		{
			id: 0,
			desc: "Appartement très accessible et confortable, très bien protégé et bien entretenu",
			dateStart: "13/09/2024",
			dateEnd: "25/09/2024",
			author: "Edouard LARROCHE",
			avatar: "",
			valueRate: 3,
		},
		{
			id: 1,
			desc: "Un super séjour nous avons passé dans le centre de Marseille, l'appartement contient le confort moderne, le service est impeccable, l'équipe est sympathique et le prix est juste ! Nous recommandons à tous ceux qui souhaitent vivre une expérience unique et exceptionnelle !",
			dateStart: "13/09/2024",
			dateEnd: "25/09/2024",
			author: "Véronique Sabier",
			avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
			valueRate: 4,
		},
		{
			id: 2,
			desc: "Super séjour, l'équipe du 11 est au top ! Merci à tous.",
			dateStart: "13/09/2024",
			dateEnd: "25/09/2024",
			author: "Julien Dorée",
			avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
			valueRate: 5,
		},
		{
			id: 3,
			desc: "Super séjour !",
			dateStart: "13/09/2024",
			dateEnd: "25/09/2024",
			author: "Adrien Leroy",
			avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=1",
			valueRate: 5,
		},
		{
			id: 4,
			desc: "L'équipe du 11 est au top ! Merci beaucoup.",
			dateStart: "13/09/2024",
			dateEnd: "25/09/2024",
			author: "Clémence Dessy",
			avatar: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
			valueRate: 4,
		},
	]

	return (
		<div className="container-notice">
			<p className="title-notice">
				Vos <span className="highlight">avis</span>
			</p>
			<CardNoticeCarousel data={cardsData} />
		</div>
	)
}

export default Notice

