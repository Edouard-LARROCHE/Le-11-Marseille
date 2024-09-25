const mongoose = require("mongoose")

const NoticeSchema = new mongoose.Schema({
	rating: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model("Notice", NoticeSchema)

