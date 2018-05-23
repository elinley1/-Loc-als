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

    createBusiness (userId, busName, street, city, state, zip, description) {
        var bAddress = {
            street: street,
            city: city,
            state: state,
            zip: zip
        };
        let newBusiness = new db.Business({
            _id: new mongoose.Types.ObjectId(),
            user: userId,
            busName: busName,
            address: bAddress,
            description: description,
            posts: []
        });

        return new Promise(function(resolve, reject){
            db.Business.findOne({busName: busName},
                                function(err, busMatch) {
                                    if (err) reject(err);
                                    if(busMatch) reject({error: 'This business has already been created.'});
                                    newBusiness.save(function(err, savedBusiness) {
                                        if(err) reject(err);
                                        resolve(savedBusiness);
                                    });
                                });
        });
    }
}
