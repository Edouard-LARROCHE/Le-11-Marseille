import React, { useState } from "react"
import moment from "moment"
import {
	Button,
	DatePicker,
	Form,
	Input,
	TreeSelect,
	message as antdMessage,
} from "antd"

import "./contact.scss"

const { RangePicker } = DatePicker

const Contact = () => {
	const [form] = Form.useForm()
	const [componentVariant, setComponentVariant] = useState("filled")

	const onFormVariantChange = ({ variant }) => {
		setComponentVariant(variant)
	}

	const reservedDates = [
		[moment("2024-09-10"), moment("2024-09-15")],
		[moment("2024-09-20"), moment("2024-09-25")],
	]

	const isDateInReservedRange = (current) => {
		const momentCurrent = moment(current)
		return reservedDates.some(([start, end]) =>
			momentCurrent.isBetween(start, end, "day", "[]"),
		)
	}

	const disabledDate = (current) => {
		if (!current) {
			return false
		}
		if (current && current < moment().endOf("day")) {
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
		<div
			className="container-contact"
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				padding: "2rem",
			}}
		>
			<div className="title-desc">
				<h1>Sur devis,</h1>
				<p className="desc">
					Nous nous engageons à vous répondre dans les plus brefs
					délais avec une proposition personnalisée au meilleur tarif.
					<br />
					Pour toutes demandes d’informations et de réservations, nous
					vous invitons à REMPLIR le FORMULAIRE DE CONTACT ci-dessous.
				</p>
				<div className="final-text">
					<p>
						Cordialement, l'équipe du{" "}
						<span className="highLight">11</span>
					</p>
				</div>
			</div>
			<Form
				layout="vertical"
				onFinish={handleSubmit}
				form={form}
				onValuesChange={onFormVariantChange}
				style={{
					width: "100%",
					maxWidth: "500px",
				}}
				initialValues={{
					variant: componentVariant,
				}}
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

				<Form.Item
					label="Téléphone"
					name="phone"
					rules={[
						{
							required: true,
							message:
								"Merci de renseigner votre numéro de téléphone",
						},
					]}
				>
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
							{
								title: "Tourisme",
								value: "tourisme",
							},
							{
								title: "Autre",
								value: "autre",
							},
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

				<Form.Item
					wrapperCol={{
						offset: 20,
						span: 24,
					}}
				>
					<Button
						type="primary"
						htmlType="submit"
						style={{ marginTop: "1rem" }}
					>
						Envoyer
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Contact

