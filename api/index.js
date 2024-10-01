const express = require("express")
const cors = require("cors")

const mongoose = require("mongoose")
const path = require("path")
const bodyParser = require("body-parser")

require("dotenv").config()

const clientRoutes = require("./routes/client.routes")
const noticesRoutes = require("./routes/notices.routes")
const nodemailerRoutes = require("./routes/nodemailer.routes")
const userRoutes = require("./routes/auth.routes")

const app = express()
const PORT = process.env.PORT || 5001
const password = encodeURIComponent(process.env.VITE_PASSWORD_MGDB)
const uri = `mongodb+srv://${process.env.VITE_USER_MGDB}:${password}@${process.env.VITE_CLUSTER_MGDB}/?retryWrites=true&w=majority&appName=${process.env.VITE_NAME_MGDB}`

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")))

mongoose
	.connect(uri)
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err))

app.use("/api/client", clientRoutes)
app.use("/api/notice", noticesRoutes)
app.use("/api/send-confirmation-email", nodemailerRoutes)
app.use("/api/auth/login", userRoutes)

app.get("/", (req, res) => res.send("Express on Vercel"))

app.listen(PORT, () => {
	console.log(`Le serveur tourne sur http://localhost:${PORT}`)
})

