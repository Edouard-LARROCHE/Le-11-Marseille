import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import { useScrollTarget } from "../../Context"

import picturesData from "../../data/picturesData"
import CardEffect from "../cardEffect/cardEffect"
import Description from "../../pages/description/description"
import Contact from "../../pages/contact/contact"
import Footer from "../../pages/footer/footer"

import IMGSejour from "/images/livingRoom/PAGE_1.jpg"
import IMGSejour2 from "/images/livingRoom/IMG_3538.jpg"
import IMGBalcon from "/images/balcony/PAGE_1.jpg"

import LogoLe11 from "../../assets/logo/le11.svg?react"
import Chevron from "../../assets/icons/chevron.svg?react"

import "./layout.scss"

gsap.registerPlugin(ScrollToPlugin)

const Layout = () => {
	const navigate = useNavigate()
	// const location = useLocation()

	const [showTopBar, setShowTopBar] = useState(false)
	const [isScrolledToTop, setIsScrolledToTop] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [isHovered, setIsHovered] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [isGalleryOpen, setIsGalleryOpen] = useState(false)
	// const [cameFromAnotherPage, setCameFromAnotherPage] = useState(false)

	const contentRef = useRef(null)
	const descriptionRef = useRef(null)
	const targetRef = useScrollTarget()

	const date = new Date()
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
	}
	const dateLocale = date.toLocaleDateString("fr-FR", options)

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
		const checkIsMobile = () => {
			setIsMobile(window.innerWidth <= 770)
		}

		checkIsMobile()
		window.addEventListener("resize", checkIsMobile)

		return () => {
			window.removeEventListener("resize", checkIsMobile)
		}
	}, [])

	// useEffect(() => {
	// 	if (location.pathname === "/" && cameFromAnotherPage) {
	// 		if (targetRef.current) {
	// 			gsap.to(window, { duration: 1, scrollTo: targetRef.current })
	// 		}
	// 		setCameFromAnotherPage(false)
	// 	}
	// }, [location.pathname, cameFromAnotherPage, targetRef])

	useEffect(() => {
		gsap.fromTo(
			contentRef.current,
			{ top: "100vh", opacity: 0 },
			{ top: "72vh", opacity: 1, duration: 2.5, ease: "power3.out" },
		)
	}, [])

	const scrollToDescription = () => {
		gsap.to(window, {
			scrollTo: { y: descriptionRef.current, offsetY: 50 },
			duration: 1.5,
			ease: "power2.inOut",
		})
	}

	const scrollToContact = () => {
		gsap.to(window, {
			scrollTo: { y: targetRef.current, offsetY: 50 },
			duration: 1.5,
			ease: "power2.inOut",
		})
	}

	const getFirstTitlesAndKeys = () => {
		return Object.values(picturesData).map((category) => ({
			title: category[0]?.title,
			key: category[0]?.key,
		}))
	}

	const switchGallery = (activeKey) => {
		navigate(`/image/${activeKey}`)
	}

	const titleData = getFirstTitlesAndKeys()

	const handleGalleryClick = () => {
		setIsGalleryOpen(!isGalleryOpen)
	}

	return (
		<div className="container">
			{showTopBar && (
				<div
					className={`topBar ${isScrolledToTop ? "visible" : "hidden"} ${isHovered ? "hovered" : ""}`}
					onMouseLeave={() => setIsHovered(false)}
				>
					<div className="topBar-content">
						<ul>
							<li translate="no">
								<a href="#" onClick={scrollToDescription}>
									A propos
								</a>
								<div className="line" />
							</li>
							<li
								className={`pics-link ${isHovered ? "hovered" : ""}`}
								onMouseEnter={() =>
									!isMobile && setIsHovered(true)
								}
								onClick={
									isMobile ? handleGalleryClick : undefined
								}
							>
								<Link to="/">Galeries photos</Link>
								<div className="line" />
								<Chevron className="chevron" />
							</li>
							<li>
								<a href="#" onClick={scrollToContact}>
									Contact
								</a>
								<div className="line" />
							</li>
						</ul>
						{(isHovered || (isMobile && isGalleryOpen)) && (
							<ul className="ul-hovered">
								{titleData.map(({ title, key }, index) => (
									<li
										className="li-hovered"
										key={index}
										onClick={() => switchGallery(key)}
									>
										<span
											className="title-text"
											translate="no"
										>
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
								Le <span className="custom-size">11</span> à
								Marseille <div className="line" />
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
					<div className="content-center-info">
						<div className="title-info">
							<h1>Marseille, le</h1>
							<h1>{dateLocale}</h1>
						</div>
						<div className="text-content-center">
							<p>
								Ici, des peintres ont travaillé une palettes de
								couleurs diverses afin de proposer un
								environement à la fois apaisant, lumineux et
								rafiné. Les matériaux ainsi que le mobilier ont
								été selectionnés avec le plus grand soin pour
								concevoir l'ameublement et la décoration
								d'intérieur de ce magnifique cocon au coeur de
								la Cité phocéenne.
								<br />
								<br />
								Cet appartement dispose également d'une literie
								complète, de draps et de serviettes de qualité
								hôtelière, d'un dressing et d'un service de
								ménage hebdomadaire.
							</p>
						</div>
						<div className="final-text">
							<p>
								Cordialement. L'équipe du{" "}
								<span className="highLight">11</span>
							</p>
						</div>
					</div>
					<div className="content-top-left">
						<img src={IMGSejour2} alt="Marseille" />
					</div>
					<div className="text-content">
						<p>
							Situé à proximité du Parc Longchamp et à quelques
							mètres de toutes commodités (supermarchés,
							transports en commun, marché quotidien, cinéma,
							piscine) ce deux pièces de{" "}
							<span className="highLight">75m2</span> est un
							véritable cocon en plein cœur de Marseille, aux{" "}
							<span className="highLight">
								intérieurs raffinés
							</span>{" "}
							et aux prestations de{" "}
							<span className="highLight">grand confort</span>.
							<br />
							<br />
							C’est un bel appartement{" "}
							<span className="highLight">traversant</span>, son
							exposition <span className="highLight">nord</span> /{" "}
							<span className="highLight">sud</span> permet une
							très belle luminosité dans les pièces de vie. Nous
							vous proposons à la location courte ou moyenne durée
							cet appartement{" "}
							<span className="highLight">luxueux</span> au centre
							de Marseille, Idéal pour des actifs en déplacements
							professionnels.
						</p>
					</div>
				</div>
				<CardEffect />
				<div ref={descriptionRef}>
					<Description />
				</div>
				<div ref={targetRef}>
					<Contact />
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout

