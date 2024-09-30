import mongoose from "mongoose"
import Notice from "../server/models/notices"

const password = encodeURIComponent(process.env.VITE_PASSWORD_MGDB)
const uri = `mongodb+srv://${process.env.VITE_USER_MGDB}:${password}@${process.env.VITE_CLUSTER_MGDB}/?retryWrites=true&w=majority&appName=${process.env.VITE_NAME_MGDB}`

const connectMongo = async () => {
	if (mongoose.connections[0].readyState) return

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
}

export default async function handler(req, res) {
	await connectMongo()

	if (req.method === "POST") {
		const newNotice = new Notice(req.body)
		await newNotice.save()
		res.status(201).json(newNotice)
	} else if (req.method === "GET") {
		const notices = await Notice.find({})
		res.status(200).json(notices)
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}

