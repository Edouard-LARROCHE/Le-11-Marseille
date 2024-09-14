import React from "react"
import { Link } from "react-router-dom"

import Footer from "../footer/footer"

import Le11Logo from "../../assets/logo/le11.svg?react"

import "./confidentiality.scss"

const Confidentiality = () => {
	const handleEmailClick = () => {
		const email = "contact@le11àmarseille.fr"
		const subject = encodeURIComponent("Information client")
		const body = encodeURIComponent("Bonjour,")
		const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`

		window.location.href = mailtoLink
	}

	return (
		<div className="container-confidentiality">
			<Le11Logo className="logoLe11" />
			<div className="back-home">
				<Link to="/">Retour à l'accueil</Link>
			</div>
			<div className="container-confidentiality-content">
				<div className="title">Politique de confidentialité</div>
				<div className="sub-title">
					La politique de confidentialité explique comment les données
					des utilisateurs sont collectées, stockées, et utilisées.
				</div>
				<div className="description">
					Nous attachons une grande importance à la protection de vos
					données personnelles et nous nous engageons à respecter la
					législation en vigueur en matière de protection des données,
					notamment le Règlement Général sur la Protection des Données
					(RGPD).
					<br />
					Données collectées : Nous recueillons des informations lors
					de votre navigation sur notre site, telles que votre adresse
					IP, votre localisation, et les pages visitées.
					<br />
					Si vous remplissez un formulaire de contact ou de
					réservation, nous collectons également votre nom, adresse
					e-mail, numéro de téléphone et toute autre information
					fournie.
				</div>
				<div className="description">
					Utilisation des données :
					<br />
					Les données recueillies sont utilisées pour :
					<br />
					- Traiter vos réservations.
					<br />
					- Vous contacter pour des informations sur votre séjour.
					<br />
					- Améliorer notre site et nos services.
					<br />
					<br />
					Sécurité des données :
					<br />
					Nous mettons en œuvre des mesures de sécurité pour protéger
					vos données contre toute perte, usage abusif ou accès non
					autorisé.
					<br />
					<br />
					Vos droits :
					<br />
					Conformément à la législation, vous disposez d’un droit
					d’accès, de modification et de suppression de vos données
					personnelles.
					<br />
					Pour toute question, contactez-nous à l’adresse suivante :
					<span
						className="highLight"
						onClick={() => handleEmailClick()}
					>
						contact@le11àmarseille.fr
					</span>
				</div>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	)
}

export default Confidentiality

