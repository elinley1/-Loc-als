/// copied from the user scheme

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')
mongoose.promise = Promise

// Define userSchema
const blogSchema = new Schema({
	title: {type: String},
	body: {type: String, required: true},
	rating: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, required: true, ref: "user"},
	business: {type: Schema.Types.ObjectId, required: true, ref: "business"}
});

// Create reference to User & export
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog
