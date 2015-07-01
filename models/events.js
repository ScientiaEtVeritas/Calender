var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	userID: Schema.Types.ObjectId,
	title: String,
	place: String,
	startd: Number,
	startm: Number,
	starty: Number,
	endd: Number,
	endm: Number,
	endy: Number,
	startts: Number,
	starttm: Number,
	endts: Number,
	endtm: Number,
	per: Number
});

mongoose.model('Event', eventsSchema);
