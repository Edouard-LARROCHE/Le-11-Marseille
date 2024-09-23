import React, { useState } from "react"
import { gsap } from "gsap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { Select, Drawer, Form, Input, DatePicker, Button } from "antd"

import { useScrollTarget } from "../../Context"
import { checkClient } from "../../server/server"

import CopyRight from "../../components/copyRight/copyRight"
import SendNotice from "../notice/components/sendNotice"
import Loader from "../../components/loader/loader"

import LogoTampon from "../../assets/logo/logo-tampon.svg?react"
import Insta from "../../assets/icons/instagram.svg?react"

import "./footer.scss"

const { Option } = Select
const { RangePicker } = DatePicker

const Footer = () => {
	const { i18n } = useTranslation()
	const [form] = Form.useForm()

	const [drawerVisible, setDrawerVisible] = useState(false)
	const [size, setSize] = useState()
	const [validedAccount, setValidedAccount] = useState(false)
	const [userData, setUserData] = useState()
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()
	const targetRef = useScrollTarget()

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng)
	}

	const handleLanguageChange = (value) => {
		changeLanguage(value)
	}

	const handleScroll = () => {
		if (location.pathname !== "/") {
			navigate("/")
		} else {
			if (targetRef.current) {
				gsap.to(window, { duration: 1, scrollTo: targetRef.current })
			}
		}
	}

	const showDrawer = () => {
		setSize("large")
		setDrawerVisible(true)
	}

	const closeDrawer = () => {
		setDrawerVisible(false)
		setValidedAccount(false)
		form.resetFields()
	}

	const submitForm = (values) => {
		setLoading(true)

		const clientData = {
			firstName: values.firstName,
			lastName: values.lastName,
			email: values.email,
			startDate: new Date(values.dates[0] + 86400000).toISOString(),
			endDate: new Date(values.dates[1] + 86400000).toISOString(),
		}

		checkClient(clientData)
			.then((response) => {
				if (response.exists) {
					const clientInfo = response.client
					setUserData(clientInfo)

					setValidedAccount(true)
					form.resetFields()
				} else {
					setValidedAccount(false)
					form.resetFields()
				}
			})
			.finally(() => {
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
					setLoading(false)
				})
			})
	}

	return (
		<div className="container-footer">
			<div className="footer-content">
				<div className="footer-content-left">
					<div className="container-logo">
						<LogoTampon />
						<p>Le 11 à Marseille</p>
					</div>
					<ul>
						<li>
							<Link to="/image/livingroom">Galeries photos</Link>
						</li>
						<li onClick={handleScroll}>Nous contacter</li>
						<li className="li-social" translate="no">
							<a
								href="https://www.instagram.com/locationle11"
								target="_blank"
								rel="noopener noreferrer"
							>
								Nous suivre sur
								<div className="container-social">
									<Insta className="instagram" />
								</div>
							</a>
						</li>
						<li onClick={showDrawer}>Laisser un avis</li>
					</ul>
					<CopyRight />
					<Select
						defaultValue={i18n.language}
						style={{
							width: 120,
							position: "absolute",
							right: "1rem",
							bottom: "1rem",
						}}
						bordered={false}
						onChange={handleLanguageChange}
						dropdownStyle={{
							zIndex: 2000,
						}}
					>
						<Option value="fr">
							<span role="img" aria-label="french flag">
								🇫🇷
							</span>{" "}
							Français
						</Option>
						<Option value="en">
							<span role="img" aria-label="english flag">
								🇬🇧
							</span>{" "}
							English
						</Option>
					</Select>
				</div>
			</div>
			<Drawer
				className="drawer"
				// title="Le 11 à Marseille"
				placement="right"
				onClose={closeDrawer}
				open={drawerVisible}
				size={size}
			>
				{!validedAccount ? (
					<>
						<div className="title-content">
							<p className="title">
								Vous avez séjourné dans notre appartement ?
							</p>
							<p className="subtitle">
								Pour nous laisser un avis, veuillez rempir le
								formulaire ci-dessous.
								<span className="highlight">
									{" "}
									Vous pourrez laisser un avis une fois votre
									séjour terminé.
								</span>
							</p>
						</div>
						<Form
							className="form-drawer"
							form={form}
							layout="vertical"
							onFinish={submitForm}
						>
							<Form.Item
								name="firstName"
								label="Nom"
								rules={[
									{
										required: true,
										message: "Veuillez entrer votre nom",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="lastName"
								label="Prénom"
								rules={[
									{
										required: true,
										message: "Veuillez entrer votre prénom",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="email"
								label="Adresse email"
								rules={[
									{
										required: true,
										message:
											"Veuillez entrer votre adresse email",
									},
									{
										type: "email",
										message:
											"Veuillez entrer une adresse email valide",
									},
								]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								name="dates"
								label="Dates du séjour"
								rules={[
									{
										required: true,
										message:
											"Veuillez sélectionner vos dates de séjour",
									},
								]}
							>
								<RangePicker
									placeholder={[
										"Date de début",
										"Date de fin",
									]}
									// direction={isMobile ? "vertical" : "horizontal"}
								/>
							</Form.Item>
							<Form.Item>
								<Button
									className="button"
									type="primary"
									htmlType="submit"
								>
									Envoyer
								</Button>
							</Form.Item>
						</Form>
					</>
				) : loading ? (
					<Loader />
				) : (
					<SendNotice
						setDrawerVisible={setDrawerVisible}
						setValidedAccount={setValidedAccount}
						userData={userData}
					/>
				)}
				<div className="help">
					<p>Besoin d'aide ?</p>
					<a href="mailto:contact@le11amarseille.fr">
						contact@le11amarseille.fr
					</a>
				</div>
			</Drawer>
		</div>
	)
}

export default Footer

