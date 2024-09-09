import React from "react"

import CopyRight from "../../components/copyRight/copyRight"

import LogoTampon from "../../assets/logo/logo-tampon.svg?react"
import Insta from "../../assets/icons/instagram.svg?react"

import "./footer.scss"

const Footer = () => {
	return (
		<div className="container-footer">
			<div className="footer-content">
				<div className="footer-content-left">
					<div className="container-logo">
						<LogoTampon />
						<p>Le 11 à Marseille</p>
					</div>
					<ul>
						<li>Galeries photo</li>
						<li>Nous contacter</li>
						<li className="li-social">
							Nous suivre sur
							<div className="container-social">
								<Insta className="instagram" />
							</div>
						</li>
						<li>Laisser un avis</li>
					</ul>
					<CopyRight />
				</div>
			</div>
		</div>
	)
}

export default Footer

