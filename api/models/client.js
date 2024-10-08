const mongoose = require("mongoose")

const ClientSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "completed", "cancelled"],
			default: "pending",
		},
		hasPostedReview: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
)

module.exports = mongoose.model("Client", ClientSchema)

