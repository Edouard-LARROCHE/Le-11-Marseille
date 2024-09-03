import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

import { shuffleArray } from "../../utils/utils"

import picturesData from "../../data/picturesData"

import "./cardEffect.scss"

const CardEffect = () => {
	const navigate = useNavigate()

	const [contentChange, setContentChange] = useState(null)
	const [selectedImages, setSelectedImages] = useState([])
	const [scrollDirection, setScrollDirection] = useState(1)
	const [isCardHovered, setIsCardHovered] = useState(false)
	const [isScrolling, setIsScrolling] = useState(false)

	const containerRef = useRef(null)
	const scrollTimeoutRef = useRef(null)

	useEffect(() => {
		const allImages = getAllImages()
		const shuffledImages = shuffleArray(allImages).slice(0, 6)
		setSelectedImages(shuffledImages)
	}, [])

	useEffect(() => {
		const handleScroll = (event) => {
			setIsScrolling(true)

			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current)
			}

			scrollTimeoutRef.current = setTimeout(() => {
				setIsScrolling(false)
			}, 100)

			const scrollY = window.scrollY
			const scrollDelta = event.deltaY || scrollY
			const container = containerRef.current

			if (scrollDelta > 0) {
				setScrollDirection(1)
			} else if (scrollDelta < 0) {
				setScrollDirection(-1)
			}

			if (container) {
				const maxScrollLeft =
					container.scrollWidth - container.clientWidth
				if (container.scrollLeft <= 0) {
					setScrollDirection(1)
				} else if (container.scrollLeft >= maxScrollLeft) {
					setScrollDirection(-1)
				}
			}
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
			clearTimeout(scrollTimeoutRef.current)
		}
	}, [])

	useEffect(() => {
		let animationFrame
		const animate = () => {
			if (containerRef.current && !isCardHovered && !isScrolling) {
				containerRef.current.scrollLeft += scrollDirection * 2
			}
			animationFrame = requestAnimationFrame(animate)
		}

		animate()

		return () => {
			cancelAnimationFrame(animationFrame)
		}
	}, [scrollDirection, isCardHovered, isScrolling])

	const getAllImages = () => {
		return Object.values(picturesData).flat()
	}

	const handleMouseOver = (e, index) => {
		setIsCardHovered(true)
		const card = e.currentTarget
		card.style.zIndex = 10
		card.style.transform = `rotate(0deg) scale(1.05)`

		setContentChange(index)
	}

	const handleMouseOut = (e, index) => {
		setIsCardHovered(false)
		const card = e.currentTarget
		card.style.zIndex = index
		card.style.transform = `scale(1)`

		setContentChange(null)
	}

	const handleCardClick = (key) => {
		navigate(`/image/${key}`)
	}

	return (
		<div className="container-card">
			<p className="title">
				Accéder aux <span className="highlight">galeries photo</span>
			</p>
			<div className="card-container" ref={containerRef}>
				{selectedImages.map((item, index) => (
					<div
						key={item.id}
						className="card"
						style={{ zIndex: index }}
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
					</div>
				))}
			</div>
		</div>
	)
}

export default CardEffect

