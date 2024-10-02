import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
	Table,
	Button,
	Select,
	message,
	Popconfirm,
	ConfigProvider,
	DatePicker,
	Space,
	Modal,
} from "antd"
import { MailOutlined } from "@ant-design/icons"
import { DeleteOutlined } from "@ant-design/icons"

import dayjs from "dayjs"
import "dayjs/locale/fr"
import isBetween from "dayjs/plugin/isBetween"
import frFR from "antd/lib/locale/fr_FR"

import {
	checkTokenUser,
	getAllClients,
	updateStatus,
	deleteClient,
	addCalendarDate,
	getAllCalendarDates,
	deleteCalendarDate,
	updateCalendarDate,
} from "../../server/server"

import Loader from "../../components/loader/loader"

import "./scss/adminPage.scss"

dayjs.locale("fr")
dayjs.extend(isBetween)

const AdminPage = () => {
	const navigate = useNavigate()

	const [tokenValid, setTokenValid] = useState(false)
	const [clients, setClients] = useState([])
	const [loading, setLoading] = useState(true)
	const [statusValues, setStatusValues] = useState({})
	const [reload, setReload] = useState(false)
	const [selectedDates, setSelectedDates] = useState([])
	const [reservedDates, setReservedDates] = useState([])
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [currentEditingDate, setCurrentEditingDate] = useState(null)

	const { Option } = Select
	const { RangePicker } = DatePicker

	const columnsClients = [
		{
			title: "Nom",
			dataIndex: "lastName",
			key: "lastName",
		},
		{
			title: "Prénom",
			dataIndex: "firstName",
			key: "firstName",
		},
		{
			title: "Dates de réservation",
			dataIndex: "date",
			key: "date",
			render: (_, record) =>
				`${new Date(record.startDate).toLocaleDateString()} - ${new Date(
					record.endDate,
				).toLocaleDateString()}`,
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			render: (text, record) => (
				<div>
					<span>{text}</span>
					<Button
						type="link"
						icon={<MailOutlined />}
						onClick={() => handleSendEmail(record.email)}
					/>
				</div>
			),
		},
		{
			title: "Date d'enregistrement",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (text) => {
				const date = new Date(text)
				const time = date.toLocaleTimeString()
				return (
					<div>
						<span>
							Le {date.toLocaleDateString()} à {time}
						</span>
					</div>
				)
			},
		},
	]

	const columnsCalendar = [
		{
			title: "Date de début",
			dataIndex: "startDate",
			key: "startDate",
			render: (startDate) => dayjs(startDate).format("DD/MM/YYYY"),
		},
		{
			title: "Date de fin",
			dataIndex: "endDate",
			key: "endDate",
			render: (endDate) => dayjs(endDate).format("DD/MM/YYYY"),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_, record) => (
				<Space size="middle">
					<Button
						type="primary"
						onClick={() => handleModifyCalendarDate(record)}
					>
						Modifier
					</Button>
					<Button
						type="primary"
						danger
						onClick={() => handleDeleteCalendarDate(record._id)}
					>
						Supprimer
					</Button>
				</Space>
			),
		},
	]

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem("token")
			if (!token) {
				setTokenValid(false)
				setLoading(false)
				navigate(`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`)

				return
			}

			try {
				const response = await checkTokenUser(token)
				if (
					response.message === "Token invalide" ||
					response.isValid === false
				) {
					setTokenValid(false)
					localStorage.removeItem("token")
					navigate(`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`)
				} else {
					setTokenValid(true)
					fetchClients()
				}
			} catch (error) {
				console.error("Erreur lors de la vérification du token:", error)
				setTokenValid(false)

				localStorage.removeItem("token")
				navigate(`/${import.meta.env.VITE_API_PATH_ADMIN_LOGIN}`)
			} finally {
				setLoading(false)
			}
		}

		verifyToken()
	}, [navigate, reload])

	useEffect(() => {
		const fetchReservedDates = async () => {
			try {
				const data = await getAllCalendarDates()
				const formattedDates = data.map((date) => ({
					...date,
					startDate: dayjs(date.startDate),
					endDate: dayjs(date.endDate),
				}))
				setReservedDates(formattedDates)
			} catch (error) {
				console.error(
					"Erreur lors du chargement des dates réservées",
					error,
				)
			}
		}

		fetchReservedDates()
	}, [])

	const fetchClients = async () => {
		await getAllClients()
			.then((dataClients) => {
				const formattedClients = dataClients.map((client) => ({
					...client,
					key: client._id,
				}))
				setClients(formattedClients)
			})
			.catch((err) => {
				console.error(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const handleRemoveClient = async (clientId) => {
		try {
			await deleteClient(clientId)
			message.success("Compte du client supprimé")

			setReload(!reload)
		} catch (error) {
			message.error("Erreur lors de la suppression du client")
		}
	}

	const handleStatusUpdate = async (clientId) => {
		const updatedStatus = statusValues[clientId]

		if (updatedStatus) {
			try {
				await updateStatus(clientId, updatedStatus)
				message.success("Statut mis à jour")

				setReload(!reload)
			} catch (error) {
				message.error("Erreur lors de la mise à jour du statut")
			}
		}
	}

	const handleStatusChange = (value, clientId) => {
		setStatusValues((prevState) => ({
			...prevState,
			[clientId]: value,
		}))
	}

	const handleSendEmail = (email) => {
		window.location.href = `mailto:${email}`
	}

	const handleAddCalendarDate = async (dates) => {
		if (!dates || dates.length !== 2) return

		const newReservation = {
			startDate: dates[0].toISOString(),
			endDate: dates[1].toISOString(),
		}

		try {
			const addedReservation = await addCalendarDate(newReservation)
			setReservedDates([
				...reservedDates,
				{
					...addedReservation,
					startDate: dayjs(addedReservation.startDate),
					endDate: dayjs(addedReservation.endDate),
				},
			])
			message.success("Nouvelle réservation ajoutée")
			window.location.reload()
		} catch (error) {
			message.error("Erreur lors de l'ajout de la réservation")
		}
	}

	const handleDeleteCalendarDate = async (id) => {
		try {
			await deleteCalendarDate(id)
			setReservedDates(reservedDates.filter((date) => date._id !== id))

			message.success("Réservation supprimée avec succès")
			setReload(!reload)
		} catch (error) {
			message.error("Erreur lors de la suppression de la réservation")
		}
	}

	const handleModifyCalendarDate = (record) => {
		setCurrentEditingDate(record)
		setIsModalVisible(true)
	}

	const handleModalOk = async () => {
		try {
			await updateCalendarDate(currentEditingDate)
			setReservedDates(
				reservedDates.map((date) =>
					date._id === currentEditingDate._id
						? currentEditingDate
						: date,
				),
			)
			setIsModalVisible(false)
			message.success("Réservation mise à jour avec succès")
			setReload(!reload)
		} catch (error) {
			message.error("Erreur lors de la mise à jour de la réservation")
		}
	}

	const handleCancelSelection = () => {
		setSelectedDates([])
	}

	const disabledDate = (current) => {
		if (current && current < dayjs().startOf("day")) {
			return true
		}

		return reservedDates.some((reservation) =>
			current.isBetween(
				dayjs(reservation.startDate),
				dayjs(reservation.endDate),
				"day",
				"[]",
			),
		)
	}

	const returnHome = () => {
		navigate(`/`)
	}

	return (
		<>
			<div className="container-admin-page">
				<div className="top-container">
					<h1>Interface d'administration</h1>
					<div className="return-home" onClick={returnHome}>
						<p>Retour à l'accueil</p>
					</div>
				</div>
			</div>
			{loading && !tokenValid ? (
				<Loader />
			) : (
				<div className="container-content">
					<div className="table-container">
						<h2>Liste des clients</h2>
						<Table
							rowKey={(record) => record._id}
							columns={columnsClients}
							dataSource={clients}
							expandable={{
								expandedRowRender: (record) => (
									<div className="expand-row">
										<div className="expand-row-div1">
											<div className="expand-row-div1-div1">
												Statut :{" "}
												<span className="expand-row-span">
													{record.status}
												</span>
											</div>
											<div>
												<Select
													defaultValue={record.status}
													style={{
														width: 120,
														height: 25,
													}}
													dropdownStyle={{
														width: "auto",
														whiteSpace: "normal",
													}}
													onChange={(value) => {
														handleStatusChange(
															value,
															record._id,
														)
													}}
												>
													<Option value="pending">
														Pending: Le client
														attend validation de sa
														reservation
													</Option>
													<Option value="completed">
														Completed: Le client a
														terminé sont séjour
													</Option>
													<Option value="cancelled">
														Cancelled: Le client a
														annulé sa réservation
													</Option>
												</Select>{" "}
												<Button
													style={{
														width: 80,
														height: 25,
													}}
													disabled={
														record.status ===
															statusValues[
																record._id
															] ||
														!statusValues[
															record._id
														]
													}
													type="primary"
													htmlType="submit"
													onClick={() =>
														handleStatusUpdate(
															record._id,
														)
													}
												>
													Modifier
												</Button>
											</div>
										</div>
										<div className="expand-row-div">
											<br />A laissé un avis :{" "}
											<span className="expand-row-span">
												{record.hasPostedReview
													? "Oui"
													: "Non"}
											</span>
										</div>
										<div className="expand-row-div">
											<br />
											Supprimer le compte :{" "}
											<span className="expand-row-span">
												<Popconfirm
													title="Êtes-vous sûr de vouloir supprimer ce compte ? Cette action est irréversible."
													onConfirm={() =>
														handleRemoveClient(
															record._id,
														)
													}
													okText="Oui"
													cancelText="Non"
												>
													<Button
														style={{
															width: 110,
															height: 25,
															marginLeft: 10,
														}}
														type="primary"
														danger
														icon={
															<DeleteOutlined />
														}
													>
														Supprimer
													</Button>
												</Popconfirm>
											</span>
										</div>
									</div>
								),
							}}
						/>
					</div>
					<div className="update-calendar">
						<h2>Date de réservation</h2>
						<Table
							rowKey={(record) => record._id}
							dataSource={reservedDates}
							columns={columnsCalendar}
						/>
						<ConfigProvider locale={frFR}>
							<div id="calendar" className="calendar-container">
								<RangePicker
									style={{ width: "100%" }}
									format="DD/MM/YYYY"
									disabledDate={disabledDate}
									value={selectedDates}
									onChange={(dates) =>
										setSelectedDates(dates)
									}
									onCalendarChange={(dates) =>
										setSelectedDates(dates)
									}
									open={true}
									inputReadOnly={true}
								/>
								<div className="calendar-actions">
									<Button
										type="primary"
										disabled={
											!selectedDates[0] ||
											!selectedDates[1]
										}
										onClick={() =>
											handleAddCalendarDate(selectedDates)
										}
									>
										Valider la réservation
									</Button>
									<Button
										onClick={handleCancelSelection}
										disabled={
											!selectedDates ||
											selectedDates.length !== 2
										}
									>
										Annuler la sélection
									</Button>
								</div>
							</div>
						</ConfigProvider>
					</div>
				</div>
			)}
			<Modal
				title="Modifier la réservation"
				open={isModalVisible}
				onOk={handleModalOk}
				onCancel={() => setIsModalVisible(false)}
			>
				{currentEditingDate && (
					<RangePicker
						value={[
							dayjs(currentEditingDate.startDate),
							dayjs(currentEditingDate.endDate),
						]}
						onChange={(dates) => {
							setCurrentEditingDate({
								...currentEditingDate,
								startDate: dates[0].toISOString(),
								endDate: dates[1].toISOString(),
							})
						}}
					/>
				)}
			</Modal>
		</>
	)
}

export default AdminPage

