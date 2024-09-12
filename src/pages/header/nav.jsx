import React from "react"
import { useParams, useNavigate } from "react-router-dom"

import picturesData from "../../data/picturesData"

import "./nav.scss"

const Nav = () => {
	const navigate = useNavigate()
	const { key: activeKey } = useParams()

	const getFirstTitlesAndKeys = () => {
		return Object.values(picturesData).map((category) => ({
			title: category[0]?.title,
			key: category[0]?.key,
		}))
	}

	const titleData = getFirstTitlesAndKeys()

	const switchGallery = (key) => {
		navigate(`/image/${key}`)
	}

	return (
		<div className="nav">
					<ul>
						{titleData.map(({ title, key }, index) => (
							<li
								key={index}
								onClick={() => switchGallery(key)}
								className={key === activeKey ? "active" : ""}
							>
								<span className="title-text">{title}</span>
								<div className="line" />
							</li>
						))}
					</ul>
				</div>
	)
}

export default Nav

