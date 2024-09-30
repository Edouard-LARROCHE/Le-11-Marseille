import React, { useState } from "react"
import { Form, Rate, Input, Upload, Button, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"

import { addNotice, updateClientHasPostedReview } from "../../../server/server"
import Loader from "../../../components/loader/loader"

import "./scss/sendNotice.scss"

const { TextArea } = Input

const SendNotice = ({ setDrawerVisible, setValidedAccount, userData }) => {
	const [form] = Form.useForm()
	const [fileList, setFileList] = useState([])
	const [loading, setLoading] = useState(false)

	const sendNotice = (values) => {
		setLoading(true)

		const formData = new FormData()
		formData.append("rating", values.rating)
		formData.append("comment", values.comment)

		if (fileList.length > 0 && fileList[0].originFileObj) {
			formData.append("picture", fileList[0].originFileObj)
		}
		formData.append("userId", userData?._id)
		formData.append("startDate", userData?.startDate)
		formData.append("endDate", userData?.endDate)
		formData.append("firstName", userData?.firstName)
		formData.append("lastName", userData?.lastName)

		addNotice(formData)
			.then(() => {
				form.resetFields()
				setValidedAccount(false)
				setFileList([])
				message.success(
					"Votre avis à été envoyé avec succès, il sera visible très bientôt !",
				)

				updateClientHasPostedReview(userData._id, true)
			})
			.catch(() => {
				message.error(
					"Erreur lors de l'envoi de votre avis. Veuillez réessayer.",
				)
			})
			.finally(() => {
				new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
					setLoading(false)
					setDrawerVisible(false)
				})
			})
	}

	const beforeUpload = (file) => {
		const isJpgOrPng =
			file.type === "image/jpeg" || file.type === "image/png"
		if (!isJpgOrPng) {
			message.error("Vous ne pouvez uploader que des fichiers JPG/PNG")
		}

		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isLt2M) {
			message.error("L'image doit faire moins de 2MB")
		}

		return isJpgOrPng && isLt2M
	}

	const handleChange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}

	return (
		<div className="send-notice-container">
			<h2>
				Laissez votre avis{" "}
				<span className="userName">
					{userData?.firstName} {userData?.lastName}
				</span>
			</h2>

			<Form form={form} layout="vertical" onFinish={sendNotice}>
				{loading ? (
					<Loader />
				) : (
					<>
						<Form.Item
							name="rating"
							label="Note"
							initialValue={1}
							rules={[
								{
									required: true,
									message: "Veuillez donner une note",
								},
							]}
						>
							<Rate style={{ color: "rgb(146, 108, 0)" }} />
						</Form.Item>

						<Form.Item
							name="comment"
							label="Commentaire"
							rules={[
								{
									required: true,
									message: "Veuillez laisser un commentaire",
								},
							]}
						>
							<TextArea rows={4} style={{ resize: "none" }} />
						</Form.Item>

						<Form.Item name="photo" label="Photo (optionnelle)">
							<Upload
								beforeUpload={beforeUpload}
								onChange={handleChange}
								fileList={fileList}
								listType="picture-card"
								maxCount={1}
							>
								{fileList.length >= 1 ? null : (
									<div>
										<UploadOutlined />
										<div style={{ marginTop: 8 }}>
											Uploader
										</div>
									</div>
								)}
							</Upload>
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Envoyer l'avis
							</Button>
						</Form.Item>
					</>
				)}
			</Form>
		</div>
	)
}

export default SendNotice

