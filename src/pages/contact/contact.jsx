import React, { useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/fr"
import { ConfigProvider } from "antd"
import frFR from "antd/lib/locale/fr_FR"
import {
	Button,
	DatePicker,
	Form,
	Input,
	TreeSelect,
	message as antdMessage,
} from "antd"

import "./contact.scss"

dayjs.locale("fr")

const { RangePicker } = DatePicker

const Contact = () => {
	const [form] = Form.useForm()
	const [componentVariant, setComponentVariant] = useState("filled")

	const onFormVariantChange = ({ variant }) => {
		setComponentVariant(variant)
	}

	const reservedDates = [
		// [dayjs("2024-09-10"), dayjs("2024-09-15")],
		// [dayjs("2024-09-20"), dayjs("2024-09-25")],
	]

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
		console.log("Values:", values)
		antdMessage.success("Formulaire soumis avec succès !")
		form.resetFields()
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
						Cordialement, l'équipe du{" "}
						<span className="highLight">11</span>
					</p>
				</div>
			</div>
			<ConfigProvider locale={frFR}>
				<Form
					layout="vertical"
					onFinish={handleSubmit}
					form={form}
					onValuesChange={onFormVariantChange}
					style={{ width: "100%", maxWidth: "500px" }}
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
						/>
					</Form.Item>

					<Form.Item label="Votre message" name="message">
						<Input.TextArea />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 20, span: 24 }}>
						<Button
							className="button-form"
							type="primary"
							htmlType="submit"
							style={{ marginTop: "1rem" }}
						>
							Envoyer
						</Button>
					</Form.Item>
				</Form>
			</ConfigProvider>
		</div>
	)
}

export default Contact

