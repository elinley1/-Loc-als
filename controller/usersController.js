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
 

    update: function (req, res) {
        db.User
            .findOneAndUpdate({'username': req.body.username}, req.body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(422).json(err));
    },
    // DB business logic level
    createUser(username, cleartextPassword) {
        return new Promise(function(resolve, reject) {
            db.User.findOne(
                {'local.username': username},
                function(err, userMatch) {
                    if(err) reject(err);
                    if(userMatch) reject({error: `Sorry, already a user with the username: ${username}`});
                    let newUser = new db.User({
                        _id: new mongoose.Types.ObjectId(),
                        'local.username': username.toLowerCase(),
                        'local.password': cleartextPassword
                    });
                    newUser.save(function(err, savedUser) {
                        if(err) reject(err);
                        resolve(savedUser);
                    });

                });
        });

       
    },
    assocBusiness(userId, businessId) {
        // Find a user into that user.businesses push businessId 
        //For that business set business.user to userId
        //return a promise that does the a  bove and then resolves or rejects 
        return new Promise(function(resolve, reject) {
            db.User.findOneAndUpdate({_id: userId},
                { $push: { businesses: businessId }},
                function(err) {
                    if(err) reject(err);
                    db.User.findById(userId, function(err, u) {
                        if(err) reject(err);
                        db.Business.findOneAndUpdate({_id: businessId}, {user: userId},
                        function(err) {
                            if(err) reject(err);
                            resolve(u);
                        });
                    });
                }
             );
        })
    }
}
