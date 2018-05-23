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
    // findByCity: function (req, res) {
    //     db.Business
    //     .find(req.params.city)
    //     .then(dbBusiness => res.json(dbBusiness))
    //     .catch(err => res.status(422).json(err));
    // },

    // create: function (req, res) {
    //     db.Business
    //     .create(req.body)
    //     .then(dbBusiness => res.json(dbBusiness))
    //     .catch(err => res.status(422).json(err));
    // },

    // update: function (req, res) {
    //     db.Business
    //     .create(req.body)
    //     .then(dbBusiness => res.json(dbBusiness))
    //     .catch(err => res.status(422).json(err));
    // }
    var userID = req.user ? req.user["_id"];
    var bName = req.body.busName;
    var bAddress = {
        street: req.body.street, 
        city: req.body.city, 
        state: req.body.state,
        zip: req.body.state
    };
    var description = req.body.busDesc;
    var blogs = req.body.posts;
    
    let newBusiness = db.business({
        _id: new mongoose.Types.ObjectId(),
        user: userId,
        busName: bName,
        address: bAddress,
        description: despcription, 
        posts = [blogs]
    });

    createBusiness (username, busName) {
        return new Promise(function(resolve, reject){
            db.User.findOne({user: user._id},
                function(err, busMatch) {
                    if (err) reject(err);
                    if(busMatch) reject({error: 'This business has already been created.'});
                    newBusiness.save(function(err, savedBusiness) {
                        if(err) reject(err);
                        resolve(savedBusiness);
                    });
                }; 
        });
    }
}