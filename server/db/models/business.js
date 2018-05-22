/// copied from the user scheme

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const businessSchema = new Schema({
	_id: Schema.Types.ObjectId,
	busName: { type: String, required: true},
	address: {
		street: {type: String, required: false},
		city: {type: String, require: false},
		state: {type: String, required: true},
		zip: {type: String, required: true}
	},
	email: {type: String, required: true},

	description: {type: String, required: false},
	
	user: {type: Schema.Types.ObjectId, ref: "user"},
	posts: [{type: Schema.Types.ObjectId, ref: "blog"}],

});

// Create reference to User & export
const Business = mongoose.model('Business', businessSchema)
module.exports = Business
