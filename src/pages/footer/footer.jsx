import React from "react"
import { gsap } from "gsap"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { useScrollTarget } from "../../Context"

import CopyRight from "../../components/copyRight/copyRight"

import LogoTampon from "../../assets/logo/logo-tampon.svg?react"
import Insta from "../../assets/icons/instagram.svg?react"

import "./footer.scss"

const Footer = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const targetRef = useScrollTarget()

	const handleScroll = () => {
		if (location.pathname !== "/") {
			navigate("/")
		} else {
			if (targetRef.current) {
				gsap.to(window, { duration: 1, scrollTo: targetRef.current })
			}
		}
	}

	return (
		<div className="container-footer">
			<div className="footer-content">
				<div className="footer-content-left">
					<div className="container-logo">
						<LogoTampon />
						<p>Le 11 à Marseille</p>
					</div>
					<ul>
						<li>
							<Link to="/image/livingroom">Galeries photo</Link>
						</li>
						<li
							onClick={() => {
								// props.setCameFromAnotherPage(true)
								handleScroll()
							}}
						>
							Nous contacter
						</li>
						<li className="li-social">
							<a
								href="https://www.instagram.com/locationle11"
								target="_blank"
								rel="noopener noreferrer"
							>
								Nous suivre sur
								<div className="container-social">
									<Insta className="instagram" />
								</div>
							</a>
						</li>
						<li className="note">Laisser un avis</li>
					</ul>
					<CopyRight />
				</div>
			</div>
		</div>
	)
}

export default Footer

