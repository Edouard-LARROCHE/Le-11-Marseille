const express = require("express")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const userModel = require("../models/user")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()

router.post("/checkTokenUser", authMiddleware, async (req, res) => {
	const { token } = req.body

	try {
		const user = await userModel.findOne({ token })
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé" })
		}

		res.json(user)
	} catch (error) {
		res.status(500).json({ message: "Erreur serveur" })
	}
})

router.post("/", async (req, res) => {
	const { email, password } = req.body

	try {
		const user = await userModel.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: "Utilisateur non trouvé" })
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({ message: "Mot de passe incorrect" })
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		)

		res.status(200).json({ token })
	} catch (error) {
		res.status(500).json({ message: "Erreur serveur" })
	}
})

module.exports = router

