import React, { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import picturesData from "../../data/picturesData"
import CardEffect from "../cardEffect/cardEffect"
import Description from "../../pages/description/description"
import Contact from "../../pages/contact/contact"
import Footer from "../../pages/footer/footer"

import IMGSejour from "/images/livingRoom/PAGE_1.jpg"
import IMGBalcon from "/images/balcony/PAGE_1.jpg"

import LogoLe11 from "../../assets/logo/le11.svg?react"
import Chevron from "../../assets/icons/chevron.svg?react"

import "./layout.scss"

gsap.registerPlugin(ScrollToPlugin)

const Layout = () => {
	const [showTopBar, setShowTopBar] = useState(false)
	const [isScrolledToTop, setIsScrolledToTop] = useState(true)
	const [lastScrollY, setLastScrollY] = useState(0)
	const [isHovered, setIsHovered] = useState(false)

	const contentRef = useRef(null)
	const descriptionRef = useRef(null)
	const contactRef = useRef(null)

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

	const scrollToDescription = () => {
		gsap.to(window, {
			scrollTo: { y: descriptionRef.current, offsetY: 50 },
			duration: 1.5,
			ease: "power2.inOut",
		})
	}

	const scrollToContact = () => {
		gsap.to(window, {
			scrollTo: { y: contactRef.current, offsetY: 50 },
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
								<a href="#" onClick={scrollToDescription}>
									A propos
								</a>
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
								<a href="#" onClick={scrollToContact}>
									Contact
								</a>
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
				<div ref={descriptionRef}>
					<Description />
				</div>
				<div ref={contactRef}>
					<Contact />
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout

