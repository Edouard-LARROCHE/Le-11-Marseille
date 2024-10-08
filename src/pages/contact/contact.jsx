import React, { useState, useEffect } from "react"
import emailjs from "emailjs-com"
import dayjs from "dayjs"
import "dayjs/locale/fr"
import isBetween from "dayjs/plugin/isBetween"

import { ConfigProvider, Spin } from "antd"
import frFR from "antd/lib/locale/fr_FR"

import {
	Button,
	DatePicker,
	Form,
	Input,
	TreeSelect,
	message as antdMessage,
} from "antd"

import {
	addClient,
	confirmationEmail,
	getAllCalendarDates,
} from "../../server/server"

import "./contact.scss"

dayjs.locale("fr")
dayjs.extend(isBetween)

const { RangePicker } = DatePicker

const Contact = () => {
	const [form] = Form.useForm()
	const [componentVariant, setComponentVariant] = useState("filled")
	const [loading, setLoading] = useState(false)
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
	const [reservedDates, setReservedDates] = useState([])

	const serviceId = import.meta.env.VITE_API_SERVICE_ID
	const templateId = import.meta.env.VITE_API_TEMPLATE_ID
	const userId = import.meta.env.VITE_API_USER_ID

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 768)
		}

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	useEffect(() => {
		const fetchReservedDates = async () => {
			try {
				const dates = await getAllCalendarDates()
				setReservedDates(
					dates.map((date) => [
						dayjs(date.startDate),
						dayjs(date.endDate),
					]),
				)
			} catch (error) {
				antdMessage.error(
					"Erreur lors de la récupération des dates réservées",
				)
			}
		}

		fetchReservedDates()
	}, [])

	const onFormVariantChange = ({ variant }) => {
		setComponentVariant(variant)
	}

	const isDateInReservedRange = (current) => {
		return reservedDates.some(([start, end]) =>
			current.isBetween(start, end, "day", "[]"),
		)
	}

	const disabledDate = (current) => {
		if (!current) {
			return false
		}
		if (current && current < dayjs().endOf("day")) {
			return true
		}
		return isDateInReservedRange(current)
	}

	const handleSubmit = (values) => {
		setLoading(true)

		const templateParams = {
			firstName: values.firstName.toLowerCase(),
			lastName: values.lastName.toLowerCase(),
			company: values.company || "N/A",
			phone: values.phone || "N/A",
			email: values.email.toLowerCase(),
			motif: values.motif,
			dates: `${dayjs(values.dates[0]).format("DD/MM/YYYY")} - ${dayjs(values.dates[1]).format("DD/MM/YYYY")}`,
			message: values.message || "N/A",
		}

		const clientData = {
			firstName: values.firstName.toLowerCase(),
			lastName: values.lastName.toLowerCase(),
			email: values.email.toLowerCase(),
			startDate: values.dates[0].toISOString(),
			endDate: values.dates[1].toISOString(),
		}

		emailjs.send(serviceId, templateId, templateParams, userId).then(
			() => {
				addClient(clientData).then((response) => {
					if (!response.success) {
						antdMessage.error(response.message)
						setLoading(false)
					} else {
						antdMessage.success("Email envoyé avec succès.")
						form.resetFields()

						setReservedDates((prevDates) => [
							...prevDates,
							[dayjs(values.dates[0]), dayjs(values.dates[1])],
						])

						confirmationEmail(clientData)
							.then((response) => {
								if (response.success) {
									antdMessage.success(
										"Un email de confirmation a été envoyé à votre adresse email.",
									)
								}
							})
							.catch(() => {
								antdMessage.error(
									"Erreur lors de l'envoi de l'email de confirmation.",
								)
							})
							.finally(() => {
								setLoading(false)
							})
					}
				})
			},
			() => {
				antdMessage.error(
					"Une erreur s'est produite, veuillez réessayer.",
				)
				setLoading(false)
			},
		)
	}

	return (
		<div className="container-contact">
			<div className="title-desc">
				<h1>Sur devis,</h1>
				<p className="desc">
					Nous nous engageons à vous répondre dans les plus brefs
					délais avec une proposition personnalisée au meilleur tarif.
					Pour toutes demandes d’informations et de réservations, nous
					vous invitons à REMPLIR le FORMULAIRE DE CONTACT ci-dessous.
				</p>
				<div className="final-text">
					<p>
						Cordialement. L'équipe du{" "}
						<span className="highLight">11</span>
					</p>
				</div>
			</div>
			<ConfigProvider locale={frFR}>
				<Spin spinning={loading}>
					<Form
						layout="vertical"
						onFinish={handleSubmit}
						form={form}
						onValuesChange={onFormVariantChange}
						style={{
							width: "100%",
							maxWidth: "500px",
						}}
						initialValues={{ variant: componentVariant }}
					>
						<Form.Item
							className="custom-input"
							label="Nom"
							name="firstName"
							rules={[
								{
									required: true,
									message: "Merci de renseigner votre nom",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Prénom"
							name="lastName"
							rules={[
								{
									required: true,
									message: "Merci de renseigner votre prénom",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item label="Société" name="company">
							<Input />
						</Form.Item>

						<Form.Item label="Téléphone" name="phone">
							<Input />
						</Form.Item>

						<Form.Item
							label="Adresse email"
							name="email"
							rules={[
								{
									required: true,
									type: "email",
									message:
										"Merci de renseigner une adresse email valide",
								},
							]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Motif du séjour"
							name="motif"
							rules={[
								{
									required: true,
									message:
										"Merci de renseigner le motif de votre séjour",
								},
							]}
						>
							<TreeSelect
								treeData={[
									{
										title: "Déplacement professionnel",
										value: "déplacement",
									},
									{ title: "Tourisme", value: "tourisme" },
									{ title: "Autre", value: "autre" },
								]}
							/>
						</Form.Item>

						<Form.Item
							label="Dates"
							name="dates"
							rules={[
								{
									required: true,
									message:
										"Merci de renseigner les dates de votre séjour",
								},
							]}
						>
							<RangePicker
								placeholder={["Date de début", "Date de fin"]}
								disabledDate={disabledDate}
								direction={isMobile ? "vertical" : "horizontal"}
							/>
						</Form.Item>

						<Form.Item label="Votre message" name="message">
							<Input.TextArea />
						</Form.Item>

						<Form.Item>
							<Button
								className="button-form"
								type="primary"
								htmlType="submit"
							>
								Envoyer
							</Button>
						</Form.Item>
					</Form>
				</Spin>
			</ConfigProvider>
		</div>
	)
}

export default Contact

