import React from "react"

import Copyright from "../../assets/icons/copyright.svg?react"

import "./copyRight.scss"

const CopyRight = () => {
	const currentYear = new Date().getFullYear()

	return (
		<div className="containerCopyRight">
			<Copyright />
			<div className="text">
				{currentYear} Le 11 à Marseille - All rights reserved
			</div>
			<ul className="ul-bottom">
				<li>Politiques de confidentialité</li>
				<li>CGV</li>
				<li>Mentions légales</li>
				<li>contact@le11amarseille.fr</li>
			</ul>
		</div>
	)
}

export default CopyRight

