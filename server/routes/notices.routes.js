const express = require("express")
const multer = require("multer")

const path = require("path")
const router = express.Router()

const noticesModel = require("../models/notices")
const clientModel = require("../models/client")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

router.post("/", upload.single("picture"), (req, res) => {
	const { rating, comment, userId, startDate, endDate, firstName, lastName } =
		req.body
	const picturePath = req.file ? req.file.path : null

	const notice = new noticesModel({
		rating,
		comment,
		picture: picturePath,
		userId,
		startDate,
		endDate,
		firstName,
		lastName,
	})

	notice
		.save()
		.then((savedNotice) => {
			res.status(201).json(savedNotice)
		})
		.catch((err) => {
			res.status(500).json({
				message: "Erreur serveur lors de l'enregistrement de l'avis !",
			})
		})
})

router.get("/", (req, res) => {
	noticesModel
		.find()
		.then((notices) => {
			res.json(notices)
		})
		.catch((err) => {
			res.status(500).json({
				message: "Erreur serveur lors de la récupération des avis.",
			})
		})
})

router.delete("/:id", (req, res) => {
	const { id } = req.params

	noticesModel
		.findByIdAndDelete(id)
		.then((deletedNotice) => {
			if (!deletedNotice) {
				return res.status(404).json({
					message: "Avis introuvable !",
				})
			}

			res.json(deletedNotice)
		})
		.catch((err) => {
			res.status(500).json({
				message: "Erreur serveur lors de la suppression de l'avis !",
			})
		})
})

router.get("/user/:userId", (req, res) => {
	const { userId } = req.params

	clientModel
		.findById(userId)
		.then((client) => {
			if (!client) {
				return res.status(404).json({ message: "Client introuvable !" })
			}

			noticesModel
				.find({ userId: userId })
				.then((notices) => {
					if (notices.length === 0) {
						return res.status(404).json({
							notices: notices,
						})
					}
					res.status(200).json(notices)
				})
				.catch((err) => {
					res.status(500).json({
						message: "Erreur lors de la récupération des avis.",
					})
				})
		})
		.catch((err) => {
			res.status(500).json({
				message: "Erreur lors de la récupération du client.",
			})
		})
})

module.exports = router

