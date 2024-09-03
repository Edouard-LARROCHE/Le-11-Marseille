import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import "./carousel.scss"

const Carousel = ({ images }) => {
	const settings = {
		dots: true,
		speed: 600,
		slidesToShow: 2,
		slidesToScroll: 2,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000,
	}

	return (
		<div className="content-carousel">
			<div className="container-carousel">
				<Slider {...settings}>
					{images.map((item, key) => (
						<div key={key}>
							<div className="img-body">
								<img src={item.imageUrl} alt={item.title} />
							</div>
							<div className="container-text">
								<h2>{item.title}</h2>
								<p>{item.desc}</p>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}

export default Carousel

