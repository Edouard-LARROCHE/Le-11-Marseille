const express = require("express")

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

	const client = new clientModel({
		firstName,
		lastName,
		email,
		startDate,
		endDate,
	})

	client
		.save()
		.then((client) => {
			res.json(client)
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
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

router.post("/checkClient", (req, res) => {
	const { firstName, lastName, email, dateSejour } = req.body

	clientModel
		.findOne({
			firstName: firstName,
			lastName: lastName,
			email: email,
			startDate: { $lte: dateSejour.endDate },
			endDate: { $gte: dateSejour.startDate },
		})
		.then((client) => {
			if (client) {
				res.json({ exists: true })
			} else {
				res.json({ exists: false })
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

module.exports = router

