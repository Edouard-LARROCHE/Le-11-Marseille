import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { login } from "../../server/server"

import { Form, Input, Button, message } from "antd"

import "./scss/adminLogin.scss"

const AdminLogin = () => {
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const handleLogin = (values) => {
		setLoading(true)

		const data = {
			email: values.email,
			password: values.password,
		}

		login(data.email, data.password)
			.then((response) => {
				if (response.token) {
					localStorage.setItem("token", response.token)
					message.success("Bienvenue Xavier !")
					navigate(`/${import.meta.env.VITE_API_PATH_ADMIN}`)
				} else {
					message.error(
						response.message || "Erreur lors de la connexion",
					)
				}
			})
			.catch(() => {
				message.error("Erreur serveur")
			})
			.finally(() => {
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
					setLoading(false)
				})
			})
	}

	const returnHome = () => {
		navigate(`/`)
	}

	return (
		<div className="container-admin-login">
			<div className="title-admin-login">
				<h1>CONNEXION</h1>
				<p>
					Merci de remplir le formulaire pour accéder à
					l'administration du site.
				</p>
				<Form onFinish={handleLogin} style={{ height: "40vh" }}>
					<Form.Item
						style={{ marginBottom: "1rem" }}
						name="email"
						rules={[
							{ required: true, message: "Email obligatoire" },
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Mot de passe obligatoire",
							},
						]}
					>
						<Input.Password placeholder="Mot de passe" />
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						loading={loading}
						style={{
							position: "absolute",
							right: "2rem",
							marginTop: "1rem",
						}}
					>
						Connexion
					</Button>
					<div className="return-home" onClick={returnHome}>
						<p>Retour à l'accueil</p>
					</div>
				</Form>
			</div>
		</div>
	)
}

export default AdminLogin

