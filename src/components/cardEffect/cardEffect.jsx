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
	const [isImageLoaded, setIsImageLoaded] = useState(false)
	const [isMobile, setIsMobile] = useState(false)
	const [touchStart, setTouchStart] = useState(null)
	const [touchEnd, setTouchEnd] = useState(null)

	const containerRef = useRef(null)
	const scrollContentRef = useRef(null)

	const animationDuration = isMobile ? "50s" : "150s"

	useEffect(() => {
		const allImages = getAllImages()
		const shuffledImages = shuffleArray(allImages)
		setSelectedImages(shuffledImages)
	}, [])

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		checkMobile()
		window.addEventListener("resize", checkMobile)

		return () => window.removeEventListener("resize", checkMobile)
	}, [])

	useEffect(() => {
		const loadImage = (src) => {
			return new Promise((resolve, reject) => {
				const img = new Image()
				img.src = src
				img.onload = () => resolve(src)
				img.onerror = reject
			})
		}

		const allImageUrls = Object.values(picturesData)
			.flat()
			.map((item) => item.imageUrl)

		Promise.all(allImageUrls.map((url) => loadImage(url)))
			.then(() => {
				setIsImageLoaded(true)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	useEffect(() => {
		if (!isImageLoaded) return

		const scrollContent = scrollContentRef.current

		const resetScroll = () => {
			scrollContent.style.transition = "none"
			scrollContent.style.transform = "translateX(0)"
			setTimeout(() => {
				scrollContent.style.transition = ""
				scrollContent.style.animation = `scroll ${animationDuration} linear infinite`
			}, 10)
		}

		scrollContent.addEventListener("animationiteration", resetScroll)

		return () =>
			scrollContent.removeEventListener("animationiteration", resetScroll)
	}, [isImageLoaded, animationDuration])

	const getAllImages = () => {
		return Object.values(picturesData).flat()
	}

	const handleMouseOver = (e, index) => {
		setContentChange(index)

		gsap.to(e.currentTarget, {
			zIndex: 10,
			scale: 1.05,
			duration: 0.3,
			ease: "power3.out",
		})
	}

	const handleMouseOut = (e, index) => {
		setContentChange(null)

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

	const onTouchStart = (e) => {
		setTouchEnd(null)
		setTouchStart(e.targetTouches[0].clientX)
	}

	const onTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX)
	}

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return

		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > 50
		const isRightSwipe = distance < -50

		if (isLeftSwipe || isRightSwipe) {
			const scrollContent = scrollContentRef.current
			const currentTransform = new WebKitCSSMatrix(
				getComputedStyle(scrollContent).transform,
			)
			const newTransform =
				currentTransform.m41 - (isLeftSwipe ? 100 : -100)
			scrollContent.style.transition = "transform 0.3s ease-out"
			scrollContent.style.transform = `translateX(${newTransform}px)`
		}
	}

	const duplicatedImages = [
		...selectedImages,
		...selectedImages,
		...selectedImages,
	]

	return (
		<div className="container-card">
			<p className="title">
				Accéder aux <span className="highlight">galeries photos</span>
			</p>
			{isImageLoaded ? (
				<div className="card-container" ref={containerRef}>
					<div
						className="scroll-content"
						ref={scrollContentRef}
						onTouchStart={onTouchStart}
						onTouchMove={onTouchMove}
						onTouchEnd={onTouchEnd}
					>
						{duplicatedImages.map((item, index) => (
							<div
								key={`${item.id}-${index}`}
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
										<div className="title">
											{item.title}
										</div>
										<p>Voir la galerie</p>
									</>
								)}
								<LogoTampon className="logo-tampon" />
							</div>
						))}
					</div>
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

