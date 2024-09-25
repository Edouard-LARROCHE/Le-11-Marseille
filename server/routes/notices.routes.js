const express = require("express")

const noticesModel = require("../models/notices")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/")
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

router.post("/notice", upload.single("photo"), (req, res) => {
	const { rating, comment } = req.body
	const photoPath = req.file ? req.file.path : null

	const notice = new noticesModel({
		rating,
		comment,
		picture: photoPath,
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

module.exports = router

