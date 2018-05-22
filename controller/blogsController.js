var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var PORT = 3000;

// Require all models
var db = require("../server/db/models");

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

module.exports = {
    /**
     * Takes in express request, creates new log post associated w/ author (User)
     * and business the post is associated with
     */
    create: function (req, res) {
        // get reference to current user (author user._id?)
        //      Maybe from req via passport?
        //      go read passport w/ express doc to
        //      figure out how to get current user
        
        // get reference to business (business._id?)
        //      probably provided in req via id
        //      Figure out how to pull the business id
        //      from the express req variable

        // create blog (entry) w/ title, body, & rating

        var authorId = req.user ? req.user["_id"] : null
        var businessId = req.body.businessId
        var postTitle = req.body.title
        var postBody = req.body.body
        var postRating = req.body.rating
        
        let newBlog = db.Blog({
                _id: new mongoose.Types.ObjectId(),
                author: authorId,
                business: businessId,
                title: postTitle,
                body: postBody,
                rating: postRating
            })
        
        newBlog.save(function (err) {
            if (err) res(err)

            db.Business.findOneAndUpdate({_id: businessId},
                    { $push: { posts: newBlog._id }},
                    function(err) {
                        if(err) res(err)
                        db.User.findOneAndUpdate({_id: authorId},
                            { $push: { posts: newBlog._id }},
                           function(err) {
                               if(err) res(err)
                               newBlog
                                .populate("business")
                                .populate("author")
                                .exec(function(err, blogPost) {
                                    if(err) res(err)
                                    res.json(blogPost);
                                })                               
                           }
                       )
                    }
                )
            });
    },

    findBusiness: function (req,res) {
        db.Blog
        .findById(req.params.id)
    }

}
