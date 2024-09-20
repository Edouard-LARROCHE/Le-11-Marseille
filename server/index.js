const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 5001

app.use(cors())
app.use(express.json())

app.get("/api", (req, res) => {
	res.json({ message: "Bonjour depuis le backend!" })
})

app.listen(PORT, () => {
	console.log(`Le serveur tourne sur http://localhost:${PORT}`)
})

