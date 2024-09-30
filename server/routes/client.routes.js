const express = require("express")
const cron = require("node-cron")

const clientModel = require("../models/client")
const router = express.Router()

router.get("/", (req, res) => {
	clientModel
		.find()
		.then((clients) => {
			res.json(clients)
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.post("/", (req, res) => {
	const { firstName, lastName, email, startDate, endDate } = req.body

	clientModel
		.findOne({ email })
		.then((existingClient) => {
			if (existingClient) {
				res.status(400).json({
					success: false,
					message: "Cet email est déjà utilisé.",
				})

				return
			}

			const client = new clientModel({
				firstName,
				lastName,
				email,
				startDate,
				endDate,
			})

			return client.save()
		})
		.then((client) => {
			if (client) {
				return res.json({ success: true, client })
			}
		})
		.catch((err) => {
			return res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.get("/:id", (req, res) => {
	const { id } = req.params

	clientModel
		.findById(id)
		.then((client) => {
			if (!client) {
				res.status(404).json({ message: "Client introuvable !" })
			} else {
				res.json(client)
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.put("/:id/status", (req, res) => {
	const { id } = req.params
	const { status } = req.body

	if (!["pending", "completed", "cancelled"].includes(status)) {
		return res.status(400).json({ message: "Statut invalide !" })
	}

	clientModel
		.findByIdAndUpdate(id, { status }, { new: true })
		.then((client) => {
			if (!client) {
				res.status(404).json({ message: "Client introuvable !" })
			} else {
				res.json(client)
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.put("/:id/hasPostedReview", (req, res) => {
	const { id } = req.params
	const { hasPostedReview } = req.body

	clientModel
		.findByIdAndUpdate(id, { hasPostedReview }, { new: true })
		.then((client) => {
			if (!client) {
				res.status(404).json({ message: "Client introuvable !" })
			} else {
				res.json(client)
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.post("/checkClient", (req, res) => {
	const { firstName, lastName, email, startDate, endDate, deleteNotice } =
		req.body

	clientModel
		.findOne({
			firstName: firstName,
			lastName: lastName,
			email: email,
			startDate: startDate,
			endDate: endDate,
		})
		.then((client) => {
			if (client) {
				if (client.hasPostedReview && !deleteNotice) {
					return res.status(400).json({
						exists: true,
						alreadyPostedReview: true,
						client: client,
					})
				}
				res.json({ exists: true, client: client })
			} else {
				res.json({ exists: false })
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

cron.schedule("0 0 * * *", () => {
	const currentDate = new Date()

	clientModel
		.updateMany(
			{
				endDate: { $lt: currentDate },
				status: "pending",
			},
			{ $set: { status: "completed" } },
		)
		.then((result) => {
			console.log(`${result.nModified} clients mis à jour`)
		})
		.catch((err) => {
			console.error("Erreur lors de la mise à jour des clients :", err)
		})
})

module.exports = router

