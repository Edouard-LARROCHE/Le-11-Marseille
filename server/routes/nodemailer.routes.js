const express = require("express")
const dayjs = require("dayjs")

const router = express.Router()
const nodemailer = require("nodemailer")

const emailOVH = process.env.VITE_OVH_EMAIL
const pp = process.env.VITE_OVH_EMAIL_PP

const transporter = nodemailer.createTransport({
	host: "ssl0.ovh.net",
	port: 465,
	secure: true,
	auth: {
		user: emailOVH,
		pass: pp,
	},
})

router.post("/", (req, res) => {
	const { firstName, lastName, email, startDate, endDate } = req.body

	const formattedStartDate = dayjs(startDate).format("DD/MM/YYYY")
	const formattedEndDate = dayjs(endDate).format("DD/MM/YYYY")

	const mailOptions = {
		from: emailOVH,
		to: email,
		subject: "Confirmation d'envoi sur le site Le 11 à Marseille",
		text: `Bonjour ${firstName.toLowerCase()} ${lastName.toLowerCase()},\n\nVotre demande de réservation du ${formattedStartDate} au ${formattedEndDate} a bien été reçue. Nous vous contacterons sous peu.\n\nCordialement, L'équipe du 11`,
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return res.status(500).json({
				success: false,
				error: "Failed to send confirmation email",
			})
		} else {
			return res.status(200).json({ success: true })
		}
	})
})

module.exports = router

