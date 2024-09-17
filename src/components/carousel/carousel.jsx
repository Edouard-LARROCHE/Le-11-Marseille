import React, { useState, useEffect } from "react"
import Slider from "react-slick"
import { useNavigate } from "react-router-dom"
import { Modal } from "antd"

import Loader from "../loader/loader"

import Cross from "../../assets/icons/cross.svg?react"
import LogoTampon from "../../assets/logo/logo-tampon.svg?react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./carousel.scss"

const Carousel = ({ images }) => {
	const navigate = useNavigate()

	const [selectedImage, setSelectedImage] = useState(null)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	const settings = {
		dots: true,
		speed: 600,
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 100,
				settings: {
					dots: false,
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	useEffect(() => {
		const pic = images[0].imageUrl
		const img = new Image()

		img.src = pic
		img.onload = () => setIsImageLoaded(true)
	}, [images])

	const handleImageClick = (imageUrl) => {
		setSelectedImage(imageUrl)
		setIsModalVisible(true)
	}

	const handleClose = () => {
		navigate("/")
	}

	const handleModalClose = () => {
		setIsModalVisible(false)
	}

	return (
		<div className="content-carousel">
			{isImageLoaded ? (
				<div className="container-carousel">
					<Cross className="cross" onClick={handleClose} />
					<Slider {...settings}>
						{images.map((item, key) => (
							<div key={key}>
								<div
									className="img-body"
									onClick={() =>
										handleImageClick(item.imageUrl)
									}
								>
									<img src={item.imageUrl} alt={item.title} />
									<LogoTampon className="logo-tampon" />
								</div>
							</div>
						))}
					</Slider>

					{isModalVisible && (
						<Modal
							open={isModalVisible}
							onCancel={handleModalClose}
							footer={null}
							centered
						>
							<img
								src={selectedImage}
								alt="biggerImage"
								style={{ width: "100%" }}
							/>
						</Modal>
					)}
				</div>
			) : (
				<div className="container-loader">
					<Loader />
				</div>
			)}
		</div>
	)
}

export default Carousel

