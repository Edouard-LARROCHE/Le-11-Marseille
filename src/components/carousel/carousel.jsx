import React from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// import "./carousel.scss"

const Carousel = () => {
	const settings = {
		dots: true,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		waitForAnimate: false,
	}

	return (
		<div className="slider-container">
			<Slider {...settings}>
				<div>
					<img src="https://swiperjs.com/demos/images/nature-1.jpg" />
				</div>
				<div>
					<img src="https://swiperjs.com/demos/images/nature-2.jpg" />
				</div>
				<div>
					<img src="https://swiperjs.com/demos/images/nature-3.jpg" />
				</div>
				<div>
					<img src="https://swiperjs.com/demos/images/nature-4.jpg" />
				</div>
			</Slider>
		</div>
	)
}

export default Carousel

