import React, { useState } from "react"

import MapboxMap from "../../components/maps/map"

import Loca from "../../assets/icons/loca.svg?react"
import Equipment from "../../assets/icons/equipment.svg?react"
import Door from "../../assets/icons/door.svg?react"
import Cross from "../../assets/icons/cross.svg?react"

import Bluetooth from "../../assets/icons/equipment/bluetooth.svg?react"
import Coofee from "../../assets/icons/equipment/coofee.svg?react"
import KitchenSet from "../../assets/icons/equipment/kitchen-set.svg?react"
import Wifi from "../../assets/icons/equipment/wifi.svg?react"

import Car from "../../assets/icons/car.svg?react"
import Train from "../../assets/icons/train.svg?react"
import Cyclist from "../../assets/icons/cyclist.svg?react"
import RunningMan from "../../assets/icons/runningMan.svg?react"

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
			descriptionTitle: "Accès voyageurs",
			descriptionTitle2: "En option",
			description: `- Tram T2 à 2 mn à pied
			<br/>
			- Appartement situé au sixième étage avec ascenseur 
			<br/>
			- Accès badge Vigick
			<br/>
			- Porte blindée 7 points à l’entrée.`,
			description2: `Mise à dispo d’un <span class="higtlight">BOX VOITURE</span> (facturation supplémentaire à la journée) à 4mn à
			pieds de l’appartement`,
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
			<span class="underline">La durée minimum de location est d’1 semaine.</span>`,
		},
		{
			title: `Les <span class="plus">+</span> de l'appartement`,
			description: `L'appartement est situé dans un quartier <span class="higtlight">calme et sécurisé</span>, à
			proximité des transports en commun.Vous trouverez un très grand nombre de commerces, des supermarchés à 5 minutes à pied ainsi que plusieurs restaurants dans les environs.
			<br/>
			<br/>
			`,
			description2: `L'appartement est équipé de tout le <span class="higtlight">confort moderne</span>: cuisine équipée, Wi-Fi, ventilateurs plafonniers, dressing, etc. (voir rubrique "équipements")
			<br/>
			Vous y trouverez également des draps, serviettes, et produits d'accueil pour un séjour agréable.`,
			description3: `
			<br/>
			- <span class="higtlight">Ménage</span> de rafraichissement <span class="higtlight">hebdomadaire inclus</span> dans le forfait.
			<br/>
			- Assistance disponible tout au long de votre séjour.`,
		},
	]

	const renderEquipments = () => {
		return (
			<div className="">
				<ul>
					<li>
						<div className="icon-container">
							<Wifi />
						</div>
						<div className="text-container">
							<p>Wi-Fi haut débit / fibre</p>
						</div>
					</li>
					<li>
						<div className="icon-container">
							<Equipment />
						</div>
						<div className="text-container">
							<p>TV murale</p>
						</div>
					</li>
					<li>
						<div className="icon-container">
							<Bluetooth />
						</div>
						<div className="text-container">
							<p>Système audio bluetooth</p>
						</div>
					</li>
					<li>
						<div className="icon-container">
							<Coofee />
						</div>
						<div className="text-container">
							<p>Machine à café Nespresso</p>
						</div>
					</li>
					<li>
						<div className="icon-container">
							<KitchenSet />
						</div>
						<div className="text-container">
							<p>
								Kit ustensiles de cuisine complet, lave linge,
								four, micro ondes, plaque de cuisson à
								induction, lave vaisselle, frigo-congélateur.
							</p>
						</div>
					</li>
					<li>
						<div className="text-container-other">
							<div className="dot" />
							<p>Produits de toilette</p>
						</div>
					</li>
					<li>
						<div className="text-container-other">
							<div className="dot" />
							<p>
								Ventilateurs plafonniers (double séjour et
								chambre)
							</p>
						</div>
					</li>
					<li>
						<div className="text-container-other">
							<div className="dot" />
							<p>Kit de ménage et repassage</p>
						</div>
					</li>
					<li>
						<div className="text-container-other">
							<div className="dot" />
							<p>Serviette de toilette et parures de lit</p>
						</div>
					</li>
				</ul>
			</div>
		)
	}

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
											<span>20 min</span>
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
											<span>27 min</span>
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
																11 rue FONDERE,
																13004 Marseille,
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
															<p>{`2 pièces (1 salle d'eau, cuisine, loggia, balcon, dressing)`}</p>
														</div>
													</li>
													<li>
														<div className="icon-container">
															<Equipment />
														</div>
														<div className="text-container">
															<p>
																Télévison
																murale, Wi-Fi
																haut débit /
																fibre etc...
															</p>
															<p>
																16 équipements
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
		</div>
	)
}

export default Description

