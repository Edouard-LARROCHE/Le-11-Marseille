import mongoose from "mongoose"
import Client from "../server/models/client"

const password = encodeURIComponent(import.meta.env.VITE_PASSWORD_MGDB)
const uri = `mongodb+srv://${import.meta.env.VITE_USER_MGDB}:${password}@${import.meta.env.VITE_CLUSTER_MGDB}/?retryWrites=true&w=majority&appName=${import.meta.env.VITE_NAME_MGDB}`

const connectMongo = async () => {
	if (mongoose.connection.readyState === 0) {
		await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
	}
}

export default async function handler(req, res) {
	await connectMongo()

	if (req.method === "GET") {
		try {
			const clients = await Client.find({})
			res.status(200).json(clients)
		} catch (error) {
			res.status(500).json({
				error: "Erreur lors de la récupération des clients",
			})
		}
	} else if (req.method === "POST") {
		try {
			const client = new Client(req.body)
			await client.save()
			res.status(201).json(client)
		} catch (error) {
			res.status(500).json({
				error: "Erreur lors de la création du client",
			})
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

