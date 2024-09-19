import React, { useState, useRef, useEffect } from "react"
// import { Button } from "antd"
// import { LeftOutlined, RightOutlined } from "@ant-design/icons"

import CardNotice from "../../../components/card/card"

import "./cardNoticeCarousel.scss"

const CardNoticeCarousel = ({ data }) => {
	const carouselRef = useRef(null)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [maxScroll, setMaxScroll] = useState(0)

	useEffect(() => {
		const container = carouselRef.current
		if (container) {
			setMaxScroll(container.scrollWidth - container.clientWidth)
		}
	}, [data])

	const scroll = (direction) => {
		const container = carouselRef.current

		if (container) {
			const scrollAmount = 300
			const newPosition =
				direction === "left"
					? Math.max(0, scrollPosition - scrollAmount)
					: Math.min(maxScroll, scrollPosition + scrollAmount)

			container.scrollTo({
				left: newPosition,
				behavior: "smooth",
			})
			setScrollPosition(newPosition)
		}
	}

	return (
		<div className="carousel-container">
			{/* <Button
				className="carousel-button left"
				onClick={() => scroll("left")}
				disabled={scrollPosition <= 0}
				icon={<LeftOutlined />}
			/> */}
			<div className="carousel" ref={carouselRef}>
				{data.map((item, index) => (
					<CardNotice key={index} item={item} index={index} />
				))}
			</div>
			{/* <Button
				className="carousel-button right"
				onClick={() => scroll("right")}
				disabled={scrollPosition >= maxScroll}
				icon={<RightOutlined />}
			/> */}
		</div>
	)
}

export default CardNoticeCarousel

