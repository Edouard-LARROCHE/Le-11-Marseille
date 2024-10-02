import React from "react"
import { Link, useNavigate } from "react-router-dom"

import Footer from "../footer/footer"

import Le11Logo from "../../assets/logo/le11.svg?react"

import "./legalNotices.scss"

const LegalNotices = () => {
	const navigate = useNavigate()

	const adminLogin = () => {
		navigate(`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`)
	}

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
					France.
					<br />
					Propriétaire du site :
					<br />
					- Nom : MARTY Xavier
					<br />
					- Adresse : 11 rue FONDERE 13004 Marseille
					<br />- E-mail : contact@le11amarseille.fr
					<br />- Administration du{" "}
					<span onClick={adminLogin}>site</span> : Mr MARTY Xavier
					<br />
					<br />
					Hébergeur du site :
					<br />
					- Nom de l’hébergeur : Vercel
					<br />
					<br />
					Editeur du site :
					<br />
					- Nom du développeur : Edouard Larroche
					<br />- Lien vers le site :
					<a
						href="https://portfolio-el-mu.vercel.app/home/projects"
						target="_blank"
						rel="noopener noreferrer"
					>
						https://portfolio-el-mu.vercel.app/home/projects
					</a>
					<br />
					<br />
					Propriété intellectuelle : Tous les contenus présents sur ce
					site (textes, images, logos, etc.) sont la propriété
					exclusive de Mr MARTY Xavier et sont protégés par le droit
					d’auteur.
				</div>
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	)
}

export default LegalNotices

