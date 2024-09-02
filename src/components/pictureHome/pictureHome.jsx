import React, { useEffect, useState } from "react"

import IMGSejour from "../../assets/images/pictures/SEJOUR/IMG_3283.jpg"
import IMGBalcon from "../../assets/images/pictures/BALCON/IMG_3516.jpg"
import LogoLe11 from "../../assets/logo/le11.svg?react"

import "./pictureHome.scss"

const PictureHome = () => {
	const [showTopBar, setShowTopBar] = useState(false)
	const [isScrolledToTop, setIsScrolledToTop] = useState(true)

	useEffect(() => {
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

		const timer = setTimeout(() => {
			smoothScroll(window.innerHeight, 5000)
		}, 1000)

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
			clearTimeout(timer)
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

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
			<div className="content">
				<div className="content-top">
					<div className="content-top-right">
						<div className="content-top-right-title">
							<h1>
								Le 11 Marseille <div className="line" />
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
				</div>
			</div>
		</div>
	)
}

export default PictureHome

