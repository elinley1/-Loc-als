const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var cors = require('cors')
var app = express()
app.use(cors(
{ 
exposedHeaders: ['X-Total-Count']
 }
))


const dbConnection = require('./db'); // loads our connection to the mongo database;
const restify = require('express-restify-mongoose');

const router = express.Router();
const db = require('./db/models');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

restify.serve(router, db.User, {totalCountHeader: true});
restify.serve(router, db.Business, {totalCountHeader: true});
restify.serve(router, db.Blog, {totalCountHeader: true});
app.use(router);

app.listen(process.env.PORT || 8080);