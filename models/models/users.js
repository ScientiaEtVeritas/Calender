var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	facebookID: String,
	name: String
});

mongoose.model('User', usersSchema);
