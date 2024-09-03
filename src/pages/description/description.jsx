import React from "react"

import "./description.scss"

const Description = () => {
	const cardData = [
		{
			title: "A propos de ce logement",
			description: `Situé à proximité du Parc Longchamp et à quelques mètres
			de toutes les commodités nécessaires (supermarchés,
			transports en communs, etc..) ce deux pièces de 75m2 est
			un véritable cocon en plein cœur de Marseille, aux
			intérieurs raffinés et aux prestations de grand confort.
			C’est un appartement traversant, exposition nord sud,
			permettant une belle luminosité dans les pièces de vie.
			Nous vous proposons à la location courte ou moyenne
			durée cet appartement luxueux au centre de Marseille,
			Idéal pour des actifs en déplacements professionnels.`,
		},
		{
			title: "Equipements et services",
			description: `L'appartement est équipé de tout le confort moderne : cuisine
			équipée, Wi-Fi, climatisation, machine à laver, etc.
			Vous y trouverez également des draps, serviettes, et
			produits d'accueil pour un séjour agréable.`,
		},
		{
			title: "Informations pratiques",
			description: `L'appartement est situé dans un quartier calme et sécurisé, à
			proximité des transports en commun. Vous trouverez un
			supermarché à 5 minutes à pied et plusieurs restaurants
			dans les environs.`,
		},
	]

	return (
		<div className="container-description">
			<div className="card-container-description">
				{cardData.map((card, index) => (
					<div key={index} className="card">
						<div className="title-card">{card.title}</div>
						<p>{card.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Description

