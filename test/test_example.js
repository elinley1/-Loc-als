var assert = require('assert');
// Set the mongo DB connection val to a test value

process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost/locale-test';
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
var server = require('../server/server.js');
chai.use(chaiHttp);

let User = require('../server/db/models/user');
let Blog = require('../server/db/models/blog');
let Business = require('../server/db/models/business');

describe('Models', () => {
    beforeEach((done) => {
        console.log("Clearing Test DB");
        User.remove({}, (err) => {
            if(err) done(err);
            console.log("Cleared Users");
            Blog.remove({}, (err) => {
                if(err) done(err);
                console.log("Cleared Blogs");
                Business.remove({}, (err) => {
                    if(err) done(err);
                    console.log("Cleared Businesses");
                    console.log("Finished DB Cleanup");
                    done();
                });
            });

        });
    });

    describe('User Model', function() {
        it("Should create user w/ hashed password", function(done) {
            //create User
            let newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                'local.username': "johndoe",
                'local.password': "password"
            });

            newUser.save(function(err, savedUser) {
                if(err) done(err);

                assert.notEqual(savedUser.local.password, "password");
                assert.equal("johndoe", savedUser.local.username);
                done();
            });

        } );
    });
});

describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);
        });
  });
});
