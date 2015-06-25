var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventsSchema = new Schema({
	user: {
	 	type: Schema.ObjectId,
		ref: 'users'
	},
	title: String,
	place: String,
	startd: Number,
	startm: Number,
	starty: Number,
	endd: Number,
	endm: Number,
	endy: Number
});

mongoose.model('Event', eventsSchema);
