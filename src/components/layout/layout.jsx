import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"

import picturesData from "../../data/picturesData"
import CardEffect from "../cardEffect/cardEffect"
import Description from "../../pages/description/description"
import Contact from "../../pages/contact/contact"
import Footer from "../../pages/footer/footer"

// import IMGSejour from "../../assets/images/pictures/SEJOUR/IMG_3283.jpg"
import IMGSejour from "/images/IMG_3283.jpg"
import IMGBalcon from "../../assets/images/pictures/BALCON/IMG_3516.jpg"

import LogoLe11 from "../../assets/logo/le11.svg?react"
import Le11Vertical from "../../assets/logo/le11-vertical.svg?react"
import Le11Vertical2 from "../../assets/logo/Le11-vertical-2.svg?react"
import Le11Vertical3 from "../../assets/logo/Le11-vertical-3.svg?react"
import Le11Vertical4 from "../../assets/logo/Le11-vertical-4.svg?react"
import WaveLine from "../../assets/icons/wave-line.svg?react"
import Chevron from "../../assets/icons/chevron.svg?react"

import "./layout.scss"

const Layout = () => {
	const [showTopBar, setShowTopBar] = useState(false)
	const [isScrolledToTop, setIsScrolledToTop] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	const contentRef = useRef(null)

	useEffect(() => setShowTopBar(true), [])

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY

			if (currentScrollY > lastScrollY && currentScrollY > 0) {
				setShowTopBar(true)
				setIsScrolledToTop(false)
			} else if (currentScrollY < lastScrollY) {
				setShowTopBar(false)
			}

			setLastScrollY(currentScrollY)
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [lastScrollY])

	useEffect(() => {
		gsap.fromTo(
			contentRef.current,
			{ top: "100vh", opacity: 0 },
			{ top: "72vh", opacity: 1, duration: 2.5, ease: "power3.out" },
		)
	}, [])

	const getFirstTitlesAndKeys = () => {
		return Object.values(picturesData).map((category) => ({
			title: category[0]?.title,
			key: category[0]?.key,
		}))
	}

	const titleData = getFirstTitlesAndKeys()

	return (
		<div className="container">
			{showTopBar && (
				<div
					className={`topBar ${isScrolledToTop ? "visible" : "hidden"} ${isHovered ? "hovered" : ""}`}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div className="topBar-content">
						<ul>
							<li>
								<Link to="/">A propos</Link>
								<div className="line" />
							</li>
							<li
								className={`pics-link ${isHovered ? "hovered" : ""}`}
								onMouseEnter={() => setIsHovered(true)}
							>
								<Link to="/">Galeries photo</Link>
								<div className="line" />
								<Chevron className="chevron" />
							</li>
							<li>
								<Link to="/">Contact</Link>
								<div className="line" />
							</li>
						</ul>
						{isHovered && (
							<ul className="ul-hovered">
								{titleData.map(({ title, key }, index) => (
									<li
										className="li-hovered"
										key={index}
										onClick={() => switchGallery(key)}
									>
										<span className="title-text">
											{title}
										</span>
										<div className="line" />
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			)}
			<div className="containerImage">
				<div className="containerImage1">
					<img src={IMGSejour} alt="Marseille" />
					<LogoLe11 />
				</div>
			</div>
			<div className="content" ref={contentRef}>
				<div className="content-top">
					<div className="content-top-right">
						<div className="content-top-right-title">
							<h1>
								Le 11 à Marseille <div className="line" />
							</h1>
						</div>
						<div className="content-top-right-description">
							<p>
								Au coeur de la cité Phocéenne, votre appartement
								en{" "}
								<span className="highLight">
									BAIL MOBILITÉ.
								</span>
							</p>
							<p>
								{" "}
								La{" "}
								<span className="highLight">
									formule adaptée
								</span>{" "}
								aux déplacements professionnels de courte et
								moyenne durée.
							</p>
						</div>
					</div>
					<div className="content-top-left">
						<img src={IMGBalcon} alt="Marseille" />
						{/* <Le11Vertical className="le11Vertical" />
						<WaveLine className="waveLine" />
						<Le11Vertical2 className="le11Vertical2" />
						<WaveLine className="waveLine-extended" />
						<Le11Vertical3 className="le11Vertical3" />
						<WaveLine className="waveLine-extended-2" />
						<Le11Vertical4 className="le11Vertical4" /> */}
					</div>
					<div className="text-content">
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Ea unde possimus ratione nemo maiores
							obcaecati fuga error culpa maxime vel esse,
							repellendus in id consequuntur dolor doloremque
							corporis voluptatum aliquam.
						</p>
					</div>
				</div>
				<CardEffect />
				<Description />
				<Contact />
				<Footer />
			</div>
		</div>
	)
}

export default Layout

