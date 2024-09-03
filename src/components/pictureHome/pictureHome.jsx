import React, { useEffect, useState } from "react"

import { useAnimation } from "../../Context"

import CardEffect from "../cardEffect/cardEffect"

import IMGSejour from "../../assets/images/pictures/SEJOUR/IMG_3283.jpg"
import IMGBalcon from "../../assets/images/pictures/BALCON/IMG_3516.jpg"

import LogoLe11 from "../../assets/logo/le11.svg?react"
import Le11Vertical from "../../assets/logo/le11-vertical.svg?react"
import Le11Vertical2 from "../../assets/logo/Le11-vertical-2.svg?react"
import Le11Vertical3 from "../../assets/logo/Le11-vertical-3.svg?react"
import Le11Vertical4 from "../../assets/logo/Le11-vertical-4.svg?react"
import WaveLine from "../../assets/icons/wave-line.svg?react"

import "./pictureHome.scss"

const PictureHome = () => {
	const [showTopBar, setShowTopBar] = useState(false)
	const [isScrolledToTop, setIsScrolledToTop] = useState(true)
	const { hasAnimated, setHasAnimated } = useAnimation()

	const smoothScroll = (targetPosition, duration) => {
		const startPosition = window.scrollY
		const distance = targetPosition - startPosition
		let startTime = null

		const animation = (currentTime) => {
			if (startTime === null) {
				startTime = currentTime
			}
			const timeElapsed = currentTime - startTime
			const run = ease(timeElapsed, startPosition, distance, duration)
			window.scrollTo(0, run)
			if (timeElapsed < duration) {
				requestAnimationFrame(animation)
			}
		}

		const ease = (t, b, c, d) => {
			t /= d / 2
			if (t < 1) return (c / 2) * t * t + b
			t--
			return (-c / 2) * (t * (t - 2) - 1) + b
		}

		requestAnimationFrame(animation)
	}

	useEffect(() => {
		if (!hasAnimated) {
			const timer = setTimeout(() => {
				smoothScroll(window.innerHeight, 3000)
				setHasAnimated(true)
			}, 1000)

			return () => clearTimeout(timer)
		}

		const handleScroll = () => {
			setShowTopBar(true)

			if (window.scrollY === 0) {
				setIsScrolledToTop(true)
			} else if (window.scrollY > 50) {
				setIsScrolledToTop(false)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [hasAnimated, setHasAnimated])

	return (
		<div className="container">
			{showTopBar && (
				<div
					onMouseEnter={() => {
						if (window.scrollY !== 0) {
							setIsScrolledToTop(true)
						}
					}}
					onMouseLeave={() => {
						if (window.scrollY !== 0) {
							setIsScrolledToTop(false)
						}
					}}
					className={`topBar ${isScrolledToTop ? "visible" : "hidden"}`}
				/>
			)}
			<div className="containerImage">
				<div className="containerImage1">
					<img src={IMGSejour} alt="Marseille" />
					<LogoLe11 />
				</div>
			</div>
			<div className={`content ${hasAnimated ? "animated" : ""}`}>
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
						<Le11Vertical className="le11Vertical" />
						<WaveLine className="waveLine" />
						<Le11Vertical2 className="le11Vertical2" />
						<WaveLine className="waveLine-extended" />
						<Le11Vertical3 className="le11Vertical3" />
						<WaveLine className="waveLine-extended-2" />
						<Le11Vertical4 className="le11Vertical4" />
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
			</div>
		</div>
	)
}

export default PictureHome

