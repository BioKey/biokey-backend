const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../app');
const User = require('../models/user');
const Organization = require('../models/organization')

const should = chai.should();
chai.use(chaiHttp);


after(function(done) {
  //clear out db
  User.remove(err => {
    Organization.remove(err => {
      mongoose.connection.close();
      done();
    })
  })
});

describe('Auth', function() {
  var testUser = {
    name: 'Batman',
    email: 'batman2@gotham.co',
    password: 'test',
    phoneNumber: '555-555-555',
    isAdmin: false
  };

  describe('/api/auth/register', function() {

    afterEach(function(done){
      User.remove(function(err){
        done();
      });
    });

    it('POST should register user without org', function(done) {
      chai.request(server)
      .post('/api/auth/register')
      .send(testUser)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('token');
        done();
      });
    });

    it('POST should register user with org', function(done) {
      testUser.organization = mongoose.Types.ObjectId().toString()
      testUser.email = 'email2@gmail.com';
      chai.request(server)
      .post('/api/auth/register')
      .send(testUser)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('token');
        done();
      });
    });

    it('POST should require email', function(done) {
      chai.request(server)
      .post('/api/auth/register')
      .send({ password: testUser.password })
      .end(function(err, res){
        res.should.have.status(422);
        done();
      });
    });

    it('POST should require password', function(done) {
      chai.request(server)
      .post('/api/auth/register')
      .send({ email: testUser.email })
      .end(function(err, res){
        res.should.have.status(422);
        done();
      });
    });

  });



  describe('/api/auth/login', function() {

    before(function(done){
      var newUser = new User(testUser);
      newUser.save(err => done());
    });

    after(function(done){
      User.remove(err => done());
    });

    it('POST should login valid user', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send(testUser)
      .end(function(error, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('token');
        done();
      });
    });

    it('POST should require correct password', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'invalid'
      })
      .end(function(error, res){
        res.should.have.status(401);
        res.text.should.equal('Unauthorized');
        done();
      });
    });

    it('POST should require email', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({ password: testUser.password })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
    });

    it('POST should require password', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({ email: testUser.email })
      .end(function(err, res){
        res.should.have.status(400);
        done();
      });
    });


    it('POST should not allow invalid user', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({
        email: 'Invalid',
        password: 'Other'
      })
      .end(function(err, res){
        res.should.have.status(401);
        done();
      });
    });

  });

});