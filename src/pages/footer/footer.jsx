import React from "react"
import { gsap } from "gsap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Select } from "antd"

import { useScrollTarget } from "../../Context"

import CopyRight from "../../components/copyRight/copyRight"

import LogoTampon from "../../assets/logo/logo-tampon.svg?react"
import Insta from "../../assets/icons/instagram.svg?react"

import "./footer.scss"

const { Option } = Select

const Footer = () => {
	const { i18n } = useTranslation()

	const navigate = useNavigate()
	const location = useLocation()
	const targetRef = useScrollTarget()

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}

	const handleLanguageChange = (value) => {
		changeLanguage(value)
	}

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
							<Link to="/image/livingroom">Galeries photos</Link>
						</li>
						<li onClick={handleScroll}>Nous contacter</li>
						<li className="li-social" translate="no">
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
					<Select
						defaultValue={i18n.language}
						style={{
							width: 120,
							position: "absolute",
							right: "1rem",
							bottom: "1rem",
						}}
						bordered={false}
						onChange={handleLanguageChange}
						dropdownStyle={{
							zIndex: 2000,
						}}
					>
						<Option value="fr">
							<span role="img" aria-label="french flag">
								🇫🇷
							</span>{" "}
							Français
						</Option>
						<Option value="en">
							<span role="img" aria-label="english flag">
								🇬🇧
							</span>{" "}
							English
						</Option>
					</Select>
				</div>
			</div>
		</div>
	)
}

export default Footer

