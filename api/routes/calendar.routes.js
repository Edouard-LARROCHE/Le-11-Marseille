const express = require("express")

const calendarModel = require("../models/calendar")
const router = express.Router()

router.get("/", (req, res) => {
	calendarModel
		.find()
		.then((calendars) => {
			res.json(calendars)
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.post("/", (req, res) => {
	const { startDate, endDate } = req.body

	calendarModel
		.findOne({ startDate, endDate })
		.then((existingCalendar) => {
			if (existingCalendar) {
				res.status(400).json({
					success: false,
					message: "Cette date est déjà utilisée.",
				})

				return
			}

			const calendar = new calendarModel({
				startDate,
				endDate,
			})

			return calendar.save()
		})
		.then((calendar) => {
			if (calendar) {
				return res.json({ success: true, calendar })
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.put("/:id", (req, res) => {
	const { id } = req.params
	const { startDate, endDate } = req.body

	calendarModel
		.findByIdAndUpdate(id, { startDate, endDate }, { new: true })
		.then((calendar) => {
			if (!calendar) {
				res.status(404).json({ message: "Calendrier introuvable !" })
			} else {
				res.json(calendar)
			}
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

router.delete("/:id", async (req, res) => {
	const { id } = req.params

	calendarModel
		.findByIdAndDelete(id)
		.then((calendar) => {
			res.json(calendar)
		})
		.catch((err) => {
			res.status(500).json({ message: "Erreur serveur !" })
		})
})

module.exports = router

