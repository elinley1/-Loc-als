const express = require('express')
const router = express.Router()
const db = require('../db');

const UserController = require('../../controller/usersController');
const BusinessController = require('../../controller/businessesController');

function newBusinessRouteHandler(req, res) {
    let busName = req.body.busName;
    let street = req.body.street;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zip;
    let description = req.body.description;
    BusinessController.createBusiness(
        req.user._id,
        busName, street, city, state, zip, description
    ).then(res.json).catch(res.json);
}

router.route("/business")
    .post(newBusinessRouteHandler);

function newUserHandler(req, res) {
    let username = req.local.user;
    let street = req.body.street;
    let city = req.body.city;
    let state = req.body.state;
    let zip = req.body.zip;
    let email = req.body.email;
    let firstName = firstName;
    let lastName = lastName;
    let cityDuration = cityDuration;
    UserController.createUser(
        req.user._id, username, street, city, state, zip, email, firstName, lastName, cityDuration)
        .then(res.json).catch(res.json);
}    

router.route("/user")
    .post(newUserHandler);
    
module.exports = router;
