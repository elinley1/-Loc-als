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
        busName, street, city, state, zip, descriptioni
    ).then(res.json).catch(res.json);
}

router.route("/business")
    .post(newBusinessRouteHandler);
module.exports = router;
