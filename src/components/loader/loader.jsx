import React from "react"

import Logo from "../../assets/logo/logo-tampon.svg?react"

import "./loader.scss"

const Loader = () => {
	return (
		<div className="container-loader">
			<div className="loader" />
			<Logo className="logo-loader" />
		</div>
	)
}

export default Loader

