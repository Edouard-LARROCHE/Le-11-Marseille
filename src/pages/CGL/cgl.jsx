import React from "react"
import { Link } from "react-router-dom"

import Footer from "../footer/footer"

import Le11Logo from "../../assets/logo/le11.svg?react"

import "./cgl.scss"

const Cgl = () => {
	return (
		<div className="container-cgl">
			<Le11Logo className="logoLe11" />
			<div className="back-home">
				<Link to="/">Retour à l'accueil</Link>
			</div>
			<div className="container-cgl-content">
				<div className="title">Conditions Générales de Location</div>
				<div className="sub-title">
					Les CGL définissent les règles qui s'appliquent à la
					location de l'appartement.
				</div>
				<div className="description">
					En réservant notre appartement, vous acceptez les conditions
					suivantes :
					<br />
					<br />
					Réservation et paiement :
					<br />
					- Une caution de [montant] est exigée lors de la
					réservation.
					<br />
					- Le paiement complet doit être effectué [jours] avant
					l'arrivée.
					<br />
					<br />
					Durée de séjour :
					<br />
					- La durée minimale de séjour est de [nombre] nuits. L’heure
					d’arrivée est fixée à [heure] et le départ à [heure].
					<br />
					<br />
					Règles d’utilisation de l’appartement :
					<br />
					- Il est interdit de fumer dans l'appartement.
					<br />- Les animaux de compagnie ne sont pas admis, sauf
					accord préalable.
					<br />
					Toute dégradation de l’appartement ou des équipements sera
					facturée.
					<br />
					<br />
					Annulation :
					<br />
					Les annulations effectuées [nombre] jours avant l’arrivée
					sont remboursées à 100 %. En cas d’annulation tardive,
					[pourcentage] du montant total sera facturé.
				</div>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	)
}

export default Cgl

