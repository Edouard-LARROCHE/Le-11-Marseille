import React from "react"
import { Link } from "react-router-dom"

import Copyright from "../../assets/icons/copyright.svg?react"

import "./copyRight.scss"

const CopyRight = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className="containerCopyRight">
			<Copyright />
			<div className="text">
				{currentYear} Le 11 à Marseille - Tout droit réservé
			</div>
			<ul className="ul-bottom">
				<li>
					<Link to="/confidentiality" className="custom-link">
						Politiques de confidentialité
					</Link>
				</li>
				<li>
					<Link to="/cgl" className="custom-link">
						CGL
					</Link>
				</li>
				<li>
					<Link to="/legalNotices" className="custom-link">
						Mentions légales
					</Link>
				</li>
				<li className="custom-link-adress">
					contact@le11amarseille.fr
				</li>
			</ul>
		</div>
	)
}

export default CopyRight

