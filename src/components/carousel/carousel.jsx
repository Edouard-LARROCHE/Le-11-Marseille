import React from "react"
import Slider from "react-slick"

import { useNavigate } from "react-router-dom"

import Cross from "../../assets/icons/cross.svg?react"
import LogoTampon from "../../assets/logo/logo-tampon.svg?react"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "./carousel.scss"

const Carousel = ({ images }) => {
	const navigate = useNavigate()

	const settings = {
		dots: true,
		speed: 600,
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
	}

	const handleClose = () => {
		navigate("/")
	}

	return (
		<div className="content-carousel">
			<div className="container-carousel">
				<Cross className="cross" onClick={handleClose} />
				<Slider {...settings}>
					{images.map((item, key) => (
						<div key={key}>
							<div className="img-body">
								<img src={item.imageUrl} alt={item.title} />
								<LogoTampon className="logo-tampon" />
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}

export default Carousel

