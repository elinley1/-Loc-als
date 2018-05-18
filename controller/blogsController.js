var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/populate");

db.Blog.create(req.body)
    .then(function (dbBlog) {
        return db.Business.findOneAndUpdate({}, {$push: {blogs: dbBlog._id}})
    })
    .then(function(dbBlog) {
        res.json(dbBlog);
    })
    .catch(function (err) {
        res.json(err);
    });

