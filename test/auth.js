const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const server = require('../app');
const User = require('../models/user');

const should = chai.should();
chai.use(chaiHttp);


after(function() {
  //clear out db
  User.remove(function(err){
    mongoose.connection.close();
    done();    
  });
});

describe('Auth', function() {
  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    phoneNumber: '555-555-555',
    endpoint: 'example.com/api/6b3b015129015e0a8b9c1649',
    isAdmin: false
  };

  describe('/api/auth/register', function() {

    afterEach(function(done){
      User.remove(function(err){
        done();
      });
    });

    it('POST should register user', function(done) {
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

    beforeEach(function(done){
      var newUser = new User(testUser);
      newUser.save(done);
    });

    afterEach(function(done){
      User.remove(function(err){
        done();
      });
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

  describe('/api/auth/me', function() {

    let confirmUser = (user, val) => {
      user.should.be.a('object');
      user.should.have.property('_id');
      user.should.have.property('name');
      user.should.have.property('email');
      user.should.have.property('isAdmin');
      user.should.not.have.property('password');
      user.should.have.property('endpoint');
      user.should.not.have.property('password');
      // Check properties
      user._id.should.equal(val._id);
      user.name.should.equal(val.name);
      user.email.should.equal(val.email);
      user.isAdmin.should.equal(val.isAdmin);
      user.phoneNumber.should.equal(val.phoneNumber);
      user.endpoint.should.equal(val.endpoint);
    }

    beforeEach(function(done){
      var newUser = new User(testUser);
      newUser.save(function(err, data) {
        testUser._id = data.id;
        done();
      });
    });

    afterEach(function(done){
      User.remove(function(err){
        done();
      });
    });

    it('GET should return user for valid user', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send(testUser)
      .end(function(err, res){

        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('token');

        chai.request(server)
        .get('/api/auth/me')
        .set('authorization', res.body.token)
        .end(function(err1, res1){
          res1.should.have.status(200);
          res1.should.be.json;
          confirmUser(res1.body, testUser);
          done();
        });
      });
    });

    it('GET should deny unauthenticated user', function(done) {
      chai.request(server)
        .get('/api/auth/me')
        .end(function(err, res){
          res.should.have.status(401);
          done();
        });
    });

    it('GET should deny invalid token', function(done) {
      chai.request(server)
        .get('/api/auth/me')
        .set('authorization', 'Other token')
        .end(function(err, res){
          res.should.have.status(401);
          done();
        });
    });

  });

});