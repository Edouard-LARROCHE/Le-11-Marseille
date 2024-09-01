import React, { useEffect, useState } from "react"

import IMGSejour from "../../assets/images/pictures/SEJOUR/IMG_3283.jpg"
import LogoLe11 from "../../assets/logo/le11.svg?react"

import "./pictureHome.scss"

const PictureHome = () => {
	const [showTopBar, setShowTopBar] = useState(false)

	useEffect(() => {
		const smoothScroll = (targetPosition, duration) => {
			const startPosition = window.pageYOffset
			const distance = targetPosition - startPosition
			let startTime = null

			const animation = (currentTime) => {
				if (startTime === null) startTime = currentTime
				const timeElapsed = currentTime - startTime
				const run = ease(timeElapsed, startPosition, distance, duration)
				window.scrollTo(0, run)
				if (timeElapsed < duration) requestAnimationFrame(animation)
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
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			clearTimeout(timer)
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	return (
		<div className="container">
			{showTopBar && <div className="topBar" />}{" "}
			{/* Ajout de la barre en haut */}
			<div className="containerImage">
				<div className="containerImage1">
					<img src={IMGSejour} alt="Marseille" />
					<LogoLe11 />
				</div>
			</div>
			<div className="content">
				<h1>Contenu après l'image</h1>
				<p>
					Ceci est du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.Ceci est
					du contenu qui passe au-dessus de l'image lors du
					défilement.Ceci est du contenu qui passe au-dessus de
					l'image lors du défilement.Ceci est du contenu qui passe
					au-dessus de l'image lors du défilement.Ceci est du contenu
					qui passe au-dessus de l'image lors du défilement.
				</p>
			</div>
		</div>
	)
}

export default PictureHome

