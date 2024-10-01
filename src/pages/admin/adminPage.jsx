import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./scss/adminPage.scss"

const AdminPage = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (!token) {
			navigate(`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`)
		}
	}, [history])

	const returnHome = () => {
		navigate(`/`)
	}

	return (
		<div className="container-admin-page">
			<div className="top-container">
				<h1>Interface d'administration</h1>
				<div className="return-home" onClick={returnHome}>
					<p>Retour à l'accueil</p>
				</div>
			</div>
		</div>
	)
}

export default AdminPage

