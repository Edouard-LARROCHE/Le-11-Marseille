import React, { useState } from "react"
import { Form, Rate, Input, Upload, Button, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"

import "./scss/sendNotice.scss"

const { TextArea } = Input

const SendNotice = ({ setDrawerVisible, setValidedAccount }) => {
	const [form] = Form.useForm()
	const [fileList, setFileList] = useState([])

	const sendNotice = (values) => {
		console.log("Formulaire soumis:", values)

		message.success(
			"Votre avis à été envoyé avec succès, il sera visible très bientôt !",
		)
		form.resetFields()
		setDrawerVisible(false)
		setValidedAccount(false)
		setFileList([])
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
			<h2>Laissez votre avis</h2>
			<Form form={form} layout="vertical" onFinish={sendNotice}>
				<Form.Item
					name="rating"
					label="Note"
					initialValue={1}
					rules={[
						{ required: true, message: "Veuillez donner une note" },
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
								<div style={{ marginTop: 8 }}>Uploader</div>
							</div>
						)}
					</Upload>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Envoyer l'avis
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default SendNotice

