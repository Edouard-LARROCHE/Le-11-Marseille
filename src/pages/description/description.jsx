import React, { useState } from "react"

import MapboxMap from "../../components/maps/map"

import Loca from "../../assets/icons/loca.svg?react"
import Equipment from "../../assets/icons/equipment.svg?react"
import Door from "../../assets/icons/door.svg?react"
import Cross from "../../assets/icons/cross.svg?react"

import "./description.scss"

const Description = () => {
	const [showMap, setShowMap] = useState(false)
	const [showEquipments, setShowEquipments] = useState(false)

	const toggleMap = () => {
		setShowMap(!showMap)
	}

	const toggleEquipments = () => {
		setShowEquipments(!showEquipments)
	}

	const cardData = [
		{
			title: "Caractéristiques du logement",
			titleMap: "Localisation du logement",
			descriptionTitle: "Description du logement",
			description: `Situé à proximité du Parc Longchamp et à quelques mètres
			de toutes les commodités nécessaires (supermarchés,
			transports en communs, etc..) ce deux pièces de 75m2 est
			un véritable cocon en plein cœur de Marseille, aux
			intérieurs raffinés et aux prestations de grand confort.
			<br />
			<br />
			- C’est un appartement traversant, exposition nord sud,
			permettant une belle luminosité dans les pièces de vie.
			<br />
			<br />
			- Nous vous proposons à la location courte ou moyenne
			durée cet appartement luxueux au centre de Marseille,
			Idéal pour des actifs en déplacements professionnels.`,
		},
		{
			title: "Informations générales",
			description: `L'appartement est équipé de tout le confort moderne : cuisine
			équipée, Wi-Fi, climatisation, machine à laver, etc.
			Vous y trouverez également des draps, serviettes, et
			produits d'accueil pour un séjour agréable.`,
		},
		{
			title: `Les <span class="plus">+</span> de l'appartement`,
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
						<div className="title-card">
							{showMap && index === 0 ? (
								card.titleMap
							) : !showEquipments ? (
								<span
									dangerouslySetInnerHTML={{
										__html: card.title,
									}}
								/>
							) : index !== 0 ? (
								<span
									dangerouslySetInnerHTML={{
										__html: card.title,
									}}
								/>
							) : null}
							{showMap && index === 0 && (
								<div className="toggle-map" onClick={toggleMap}>
									<Cross />
								</div>
							)}
						</div>
						{index === 0 && showMap ? (
							<MapboxMap />
						) : (
							<div
								className={`card-content ${index === 0 ? (showEquipments ? "show-equipments" : "hide-equipments") : ""}`}
							>
								{index === 0 &&
									(!showEquipments ? (
										<>
											<div className="items-line">
												<ul>
													<li>
														<div className="icon-container">
															<Loca />
														</div>
														<div className="text-container">
															<p>
																8 Rue Brochier,
																13005 Marseille,
																France
															</p>
															<p>
																<span
																	className="link"
																	onClick={
																		toggleMap
																	}
																>
																	Voir le
																	logement sur
																	la carte
																</span>
															</p>
														</div>
													</li>
													<li>
														<div className="icon-container">
															<Door />
														</div>
														<div className="text-container">
															<p>
																75 m2 au total
															</p>
															<p>{`3 pièces (1 salle d'eau, etc)`}</p>
														</div>
													</li>
													<li>
														<div className="icon-container">
															<Equipment />
														</div>
														<div className="text-container">
															<p>
																Télévison, Four,
																plaque de
																cuisson, etc...
															</p>
															<p>
																15 équipements
																au total{" "}
																<span
																	className="link"
																	onClick={
																		toggleEquipments
																	}
																>
																	Voir les
																	équipements
																</span>
															</p>
														</div>
													</li>
												</ul>
											</div>
										</>
									) : (
										<div className="items-line-equipments">
											<div
												className="toggle-equipments"
												onClick={toggleEquipments}
											>
												Détails des équipements
												<Cross />
											</div>
										</div>
									))}
								{showEquipments && index === 0 ? (
									<></>
								) : (
									<>
										{index === 0 && (
											<p className="desc-title">
												{card.descriptionTitle}
											</p>
										)}
										<p
											dangerouslySetInnerHTML={{
												__html: card.description,
											}}
										/>
									</>
								)}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Description

