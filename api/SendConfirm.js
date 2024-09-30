import nodemailer from "nodemailer"
import dayjs from "dayjs"

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

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { firstName, lastName, email, startDate, endDate } = req.body

		const formattedStartDate = dayjs(startDate).format("DD/MM/YYYY")
		const formattedEndDate = dayjs(endDate).format("DD/MM/YYYY")

		const mailOptions = {
			from: emailOVH,
			to: email,
			subject: "Confirmation d'envoi sur le site Le 11 à Marseille",
			text: `Bonjour ${firstName.toLowerCase()} ${lastName.toLowerCase()},\n\nVotre demande de réservation du ${formattedStartDate} au ${formattedEndDate} a bien été reçue. Nous vous contacterons sous peu.\n\nCordialement, L'équipe du 11`,
		}

		try {
			const info = await transporter.sendMail(mailOptions)
			res.status(200).json({ success: true, info })
		} catch (error) {
			res.status(500).json({
				success: false,
				error: "Failed to send confirmation email",
			})
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

