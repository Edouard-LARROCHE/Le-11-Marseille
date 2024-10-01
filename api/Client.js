import mongoose from "mongoose"
import Client from "../server/models/client"

const password = encodeURIComponent(import.meta.env.VITE_PASSWORD_MGDB)
console.log(password, "password")

const uri = `mongodb+srv://${import.meta.env.VITE_USER_MGDB}:${password}@${import.meta.env.VITE_CLUSTER_MGDB}/?retryWrites=true&w=majority&appName=${import.meta.env.VITE_NAME_MGDB}`

const connectMongo = async () => {
	if (mongoose.connections[0].readyState) return

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
}

export default async function handler(req, res) {
	await connectMongo()

	if (req.method === "GET") {
		const clients = await Client.find({})
		res.status(200).json(clients)
	} else if (req.method === "POST") {
		const client = new Client(req.body)
		await client.save()
		res.status(201).json(client)
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

