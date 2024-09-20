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

module.exports = router
