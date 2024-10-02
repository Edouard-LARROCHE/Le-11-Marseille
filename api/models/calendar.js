const mongoose = require("mongoose")

const calendarSchema = new mongoose.Schema({
	startDate: {
		type: Date,
	},
	endDate: {
		type: Date,
	},
})

module.exports = mongoose.model("Calendar", calendarSchema)

