import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"

import { shuffleArray } from "../../utils/utils"
import picturesData from "../../data/picturesData"
import Loader from "../animation/loader"

import LogoTampon from "../../assets/logo/logo-tampon.svg?react"

import "./cardEffect.scss"

const CardEffect = () => {
	const navigate = useNavigate()

	const [contentChange, setContentChange] = useState(null)
	const [selectedImages, setSelectedImages] = useState([])
	const [scrollDirection, setScrollDirection] = useState(1)
	const [delta, setDelta] = useState(null)
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const containerRef = useRef(null)
	const scrollAnimationRef = useRef(null)

	useEffect(() => {
		const allImages = getAllImages()
		const shuffledImages = shuffleArray(allImages)
		setSelectedImages(shuffledImages)
	}, [])

	useEffect(() => {
		const pic = picturesData.bathroom[0].imageUrl
		const img = new Image()

		img.src = pic
		img.onload = () => setIsImageLoaded(true)
	}, [])

	useEffect(() => {
		if (!isImageLoaded) return

		startAutoScroll()

		const handleScroll = () => {
			getScrollDirection()

			if (delta > 0) {
				setScrollDirection(1)
			} else if (delta < 0) {
				setScrollDirection(-1)
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			stopAutoScroll()
			window.removeEventListener("scroll", handleScroll)
		}
	}, [delta])

	const getScrollDirection = () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop
		const windowHeight = window.innerHeight
		const documentHeight = document.body.offsetHeight

		let newDelta = 0
		if (scrollTop + windowHeight >= documentHeight) {
			newDelta = -1
		} else if (scrollTop === 0) {
			newDelta = 1
		}

		setDelta(newDelta)
	}

	const getAllImages = () => {
		return Object.values(picturesData).flat()
	}

	const startAutoScroll = () => {
		const container = containerRef.current
		const maxScrollLeft = container.scrollWidth - container.clientWidth

		const animateScroll = () => {
			const scrollAmount = scrollDirection * 1.3
			const currentScroll = container.scrollLeft + scrollAmount

			if (currentScroll >= maxScrollLeft || currentScroll <= 0) {
				setScrollDirection((prev) => prev * -1)
			}

			container.scrollLeft += scrollAmount
		}

		scrollAnimationRef.current = gsap.ticker.add(animateScroll)
	}

	const stopAutoScroll = () => {
		if (scrollAnimationRef.current) {
			gsap.ticker.remove(scrollAnimationRef.current)
			scrollAnimationRef.current = null
		}
	}

	const handleMouseOver = (e, index) => {
		setContentChange(index)
		stopAutoScroll()

		gsap.to(e.currentTarget, {
			zIndex: 10,
			scale: 1.05,
			duration: 0.3,
			ease: "power3.out",
		})
	}

	const handleMouseOut = (e, index) => {
		setContentChange(null)
		startAutoScroll()

		gsap.to(e.currentTarget, {
			zIndex: index,
			scale: 1,
			duration: 0.3,
			ease: "power3.out",
		})
	}

	const handleCardClick = (key) => {
		navigate(`/image/${key}`)
	}

	return (
		<div className="container-card">
			<p className="title">
				Accéder aux <span className="highlight">galeries photos</span>
			</p>
			{isImageLoaded ? (
				<div className="card-container" ref={containerRef}>
					{selectedImages.map((item, index) => (
						<div
							key={item.id}
							className="card"
							onMouseOver={(e) => handleMouseOver(e, index)}
							onMouseOut={(e) => handleMouseOut(e, index)}
							onClick={() => handleCardClick(item.key)}
						>
							<img
								className={`${contentChange === index ? "filter" : ""}`}
								src={item.imageUrl}
								alt={item.title}
							/>
							{contentChange === index && (
								<>
									<div className="title">{item.title}</div>
									<p>Voir la galerie</p>
								</>
							)}
							<LogoTampon className="logo-tampon" />
						</div>
					))}
					<div className="bg-color" />
				</div>
			) : (
				<div className="card-container">
					<div className="containerLoader">
						<Loader type={["long"]} number={1} />
					</div>
				</div>
			)}
		</div>
	)
}

export default CardEffect

