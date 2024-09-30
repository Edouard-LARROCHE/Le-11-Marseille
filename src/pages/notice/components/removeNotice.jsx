import React, { useState } from "react"
import { Form, Button, message } from "antd"

import {
	removeNotice,
	updateClientHasPostedReview,
} from "../../../server/server"
import { capitalizeFirstLetter } from "../../../utils/utils"

import Card from "../../../components/card/card"
import Loader from "../../../components/loader/loader"

import "./scss/removeNotice.scss"

const RemoveNotice = ({ setDrawerVisible, setValidedAccount, noticeData }) => {
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)

	const deleteNotice = () => {
		setLoading(true)

		removeNotice(noticeData._id)
			.then(() => {
				updateClientHasPostedReview(noticeData.userId, false)

				form.resetFields()
				setValidedAccount(false)
				message.success("Votre avis a été supprimé avec succès !")
			})
			.catch(() => {
				message.error(
					"Erreur lors de la suppression de votre avis. Veuillez réessayer.",
				)
			})
			.finally(() => {
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
					setLoading(false)
					setDrawerVisible(false)
				})
			})
	}

	const noticeCreatedAt = new Date(noticeData?.createdAt)

	return (
		<div className="remove-notice-container">
			<h2>
				Suppression de votre avis{" "}
				<span className="userName">
					{noticeData?.firstName.toUpperCase()}{" "}
					{capitalizeFirstLetter(noticeData?.lastName)}
				</span>
			</h2>

			<Form form={form} layout="vertical" onFinish={deleteNotice}>
				{loading ? (
					<Loader />
				) : (
					<>
						<Card item={noticeData} />
						<div className="container-bottom">
							<div className="date-created">
								<p>
									Avis créé le{" "}
									{noticeCreatedAt.toLocaleDateString()}
								</p>
							</div>
							<Form.Item>
								<Button type="primary" htmlType="submit">
									Supprimer l'avis
								</Button>
							</Form.Item>
						</div>
					</>
				)}
			</Form>
		</div>
	)
}

export default RemoveNotice

