import React from "react"

import LogoLe11 from "../assets/logo/le11.svg?react"

import "./title.scss"

const Title = () => {
	return (
		<div className="containerTitle">
			<div className="logo">
				<LogoLe11 />
				<div className="line" />
			</div>
		</div>
	)
}

export default Title

