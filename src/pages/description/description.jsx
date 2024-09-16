import React, { useState } from "react"
import { Modal } from "antd"

import MapboxMap from "../../components/maps/map"

import Plan from "/images/plan/plan.jpg"

import Loca from "../../assets/icons/loca.svg?react"
import Equipment from "../../assets/icons/equipment.svg?react"
import Door from "../../assets/icons/door.svg?react"
import Cross from "../../assets/icons/cross.svg?react"

// import Bluetooth from "../../assets/icons/equipment/bluetooth.svg?react"
// import Coofee from "../../assets/icons/equipment/coofee.svg?react"
// import KitchenSet from "../../assets/icons/equipment/kitchen-set.svg?react"
// import Wifi from "../../assets/icons/equipment/wifi.svg?react"

import Car from "../../assets/icons/car.svg?react"
import Train from "../../assets/icons/train.svg?react"
import Cyclist from "../../assets/icons/cyclist.svg?react"
import RunningMan from "../../assets/icons/runningMan.svg?react"

import "./description.scss"

const Description = () => {
	const [showMap, setShowMap] = useState(false)
	const [showEquipments, setShowEquipments] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)

	const toggleMap = () => {
		setShowMap(!showMap)
	}

	const toggleEquipments = () => {
		setShowEquipments(!showEquipments)
	}

	const showPlan = () => {
		setIsModalVisible(true)
	}

	const handleModalClose = () => {
		setIsModalVisible(false)
	}

	const cardData = [
		{
			title: "Caractéristiques du logement",
			titleMap: "Localisation du logement",
			descriptionTitle: "Accès voyageurs",
			descriptionTitle2: "En option",
			description: `- Tram T2 à 2 mn à pied
			<br/>
			- Appartement situé au sixième étage avec ascenseur 
			<br/>
			- Accès badge Vigick
			<br/>
			- Porte blindée 7 points à l’entrée.`,
			description2: `Un <span class="higtlight">box privatif</span> pour votre voiture, à 300 mètres de l’appartement
			Accès direct sur la rue, <span class="higtlight">ouverture télécommandée</span>`,
		},
		{
			title: "Informations générales",
			description: `Les <span class="higtlight">tarifs</span> sont proposés à la demande, sur devis à la <span class="higtlight">semaine ou au mois</span>.
			<br/>
			<br/>
			Le <span class="higtlight">forfait ménage</span> hebdomadaire sera <span class="higtlight">compris dans le tarif</span>, et fait en fonction de vos
			disponibilités.
			<br/>
			Nous vous informons que l’organisation de fêtes ou tous événements festifs est
			formellement interdite, nous restons très stricts à ce sujet, conformément à l’état des
			lieux et à l’inventaire approuvé lors de la signature du bail.
			<br/>
			<br/>
			<span class="underline">L’occupation des lieux doit être conforme au règlement de copropriété et au respect
			du voisinage.</span>
			<br/>
			<br/>
			<span class="higtlight">2 formules de bail</span> vous sont proposées:
			<br/>
			- Le <span class="higtlight">bail mobilité</span> : la formule idéale pour les déplacements professionnels.
			<br/>
			- Le <span class="higtlight">bail civil</span> : le contrat locatif adapté aux courtes durées.
			<br/>
			<span class="underline">La durée minimum de location est d’une semaine.</span>`,
		},
		{
			title: `Les <span class="plus">+</span> de l'appartement`,
			description: `L'appartement est situé dans un quartier <span class="higtlight">calme et sécurisé</span>, à
			proximité des transports en commun. Vous trouverez un très grand nombre de commerces, des supermarchés à 5 minutes à pied ainsi que plusieurs restaurants dans les environs.
			<br/>
			<br/>
			`,
			description2: `L'appartement est équipé de tout le <span class="higtlight">confort moderne</span>: cuisine équipée, Wi-Fi, ventilateurs plafonniers, dressing, etc... (voir rubrique "équipements")
			<br/>
			Vous y trouverez également des draps, serviettes, et produits d'accueil pour un séjour agréable.`,
			description3: `
			<br/>
			- <span class="higtlight">Ménage</span> de rafraichissement <span class="higtlight">hebdomadaire inclus</span> dans le forfait.
			<br/>
			- Assistance disponible tout au long de votre séjour.`,
		},
	]

	const equipmentData = [
		{
			id: 1,
			title: "Wifi haut débit / fibre",
		},
		{
			id: 2,
			title: "Système audio bluetooth",
		},
		{
			id: 3,
			title: "TV murale",
		},
		{
			id: 4,
			title: "Machine à café Nespresso",
		},
		{
			id: 5,
			title: "Electroménager complet SIEMENS",
		},
		{
			id: 6,
			title: "Induction",
		},
		{
			id: 7,
			title: "Four",
		},
		{
			id: 8,
			title: "Micro ondes",
		},
		{
			id: 9,
			title: "Lave vaisselle",
		},
		{
			id: 10,
			title: "Lave linge",
		},
		{
			id: 11,
			title: "Frigo-congélateur",
		},
		{
			id: 12,
			title: "Bouilloire",
		},
		{
			id: 13,
			title: "Grille pain",
		},
		{
			id: 14,
			title: "Kit ustensiles cuisine complet",
		},
		{
			id: 15,
			title: "Kit de ménage et repassage",
		},
		{
			id: 16,
			title: "Serviette de toilette",
		},
		{
			id: 17,
			title: "Produits de toilette",
		},
		{
			id: 18,
			title: "Parures de lits",
		},
		{
			id: 19,
			title: "Ventilateurs plafonds chambre et séjour",
		},
		{
			id: 20,
			title: "Radiateurs électriques THERMOR haut de game",
		},
		{
			id: 21,
			title: "Ballon d'eau chaude 200 litres",
		},
	]

	const renderEquipments = () => {
		return (
			<>
				{equipmentData.map((equipment, index) => (
					<ul key={index}>
						<li>
							<div className="text-container-other">
								<div className="dot" />
								<p>{equipment.title}</p>
							</div>
						</li>
					</ul>
				))}
			</>
		)
	}

	return (
		<div className="container-description">
			<div className="card-container-description">
				{cardData.map((card, index) => (
					<div key={index} className={`card card-${index}`}>
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
							<>
								<MapboxMap />
								<div className="map-container">
									<p>
										Distance depuis la Gare Routière St
										Charles:
									</p>
									<ul>
										<li>
											<div className="icon-container">
												<Car />
											</div>
											<span>6 min</span>
										</li>
										<li>
											<div className="icon-container">
												<Train />
											</div>
											<span>10 min</span>
										</li>
										<li>
											<div className="icon-container">
												<Cyclist />
											</div>
											<span>8 min</span>
										</li>
										<li>
											<div className="icon-container">
												<RunningMan />
											</div>
											<span>20 min</span>
										</li>
									</ul>
									<p className="tram-container">
										Tram T2 à 2 min à pied du logement
									</p>
								</div>
							</>
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
																Marseille 13004,
																quartier des 5
																Avenues
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
																75 m2 au total{" "}
																<span
																	className="link"
																	onClick={
																		showPlan
																	}
																>
																	Voir le plan
																</span>
															</p>
															<p>{`2 pièces (1 salle d'eau, cuisine, loggia, balcon, dressing)`}</p>
														</div>
													</li>
													<li>
														<div className="icon-container">
															<Equipment />
														</div>
														<div className="text-container">
															<p>
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
											{renderEquipments()}
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
										{index === 0 && (
											<p className="desc-title">
												{card.descriptionTitle2}
											</p>
										)}
										<p
											dangerouslySetInnerHTML={{
												__html: card.description2,
											}}
										/>
										{index === 2 && (
											<p
												dangerouslySetInnerHTML={{
													__html: card.description3,
												}}
											/>
										)}
									</>
								)}
							</div>
						)}
					</div>
				))}
			</div>
			{isModalVisible && (
				<Modal
					open={isModalVisible}
					onCancel={handleModalClose}
					footer={null}
					centered
					width={900}
				>
					<img
						src={Plan}
						alt="biggerImage"
						style={{ width: "100%" }}
					/>
				</Modal>
			)}
		</div>
	)
}

export default Description

