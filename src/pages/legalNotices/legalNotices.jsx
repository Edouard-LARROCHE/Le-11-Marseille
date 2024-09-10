import React from "react"
import { Link } from "react-router-dom"

import Footer from "../footer/footer"

import Le11Logo from "../../assets/logo/le11.svg?react"

import "./legalNotices.scss"

const LegalNotices = () => {
	return (
		<div className="container-legal-notices">
			<Le11Logo className="logoLe11" />
			<div className="back-home">
				<Link to="/">Retour à l'accueil</Link>
			</div>
			<div className="container-legal-notices-content">
				<div className="title">Mentions légales</div>
				<div className="sub-title">
					Les mentions légales sont obligatoires et incluent les
					informations sur l’éditeur du site, l’hébergeur, etc.
				</div>
				<div className="description">
					Conformément à la loi pour la confiance dans l'économie
					numérique (LCEN) du 21 juin 2004, voici les informations
					légales concernant ce site.
					<br />
					<br />
					Le site est hébergé par Vercel, Inc. et est hébergé en
					France. Propriétaire du site :
					<br />
					- Nom : [Nom]
					<br />
					- Adresse : [Adresse postale]
					<br />- Téléphone : [Numéro de téléphone]
					<br />- E-mail : [Adresse e-mail]
					<br />
					<br />
					- Hébergeur du site :
					<br />
					- Nom de l’hébergeur : Vercel
					<br />
					- Adresse : [Adresse de Vercel]
					<br />- Téléphone : [Numéro de contact de Vercel]
					<br />
					<br />
					Propriété intellectuelle : Tous les contenus présents sur ce
					site (textes, images, logos, etc.) sont la propriété
					exclusive de [Nom de la personne/entreprise] et sont
					protégés par le droit d’auteur.
				</div>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	)
}

export default LegalNotices

