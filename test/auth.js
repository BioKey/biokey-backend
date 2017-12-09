var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var server = require('../app');
var User = require('../models/user');

var should = chai.should();
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
        res.body.should.have.property('auth');
        res.body.should.have.property('token');
        res.body.auth.should.equal(true);
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
      var newUser = new User({
        name: testUser.name,
        email: testUser.email,
        password: bcrypt.hashSync(testUser.password, 8)
      });
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
        res.body.should.have.property('auth');
        res.body.should.have.property('token');
        res.body.auth.should.equal(true);
        done();
      });
    });

    it('POST should require valid password', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'invalid'
      })
      .end(function(error, res){
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.have.property('auth');
        res.body.should.have.property('token');
        res.body.auth.should.equal(false);
        should.equal(res.body.token, null);
        done();
      });
    });

    it('POST should require email', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({ password: testUser.password })
      .end(function(err, res){
        res.should.have.status(422);
        done();
      });
    });

    it('POST should require password', function(done) {
      chai.request(server)
      .post('/api/auth/login')
      .send({ email: testUser.email })
      .end(function(err, res){
        res.should.have.status(422);
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
        res.should.have.status(404);
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
      // Check properties
      user._id.should.equal(val._id);
      user.name.should.equal(val.name);
      user.email.should.equal(val.email);
      user.isAdmin.should.equal(val.isAdmin);
    }

    beforeEach(function(done){
      var newUser = new User({
        name: testUser.name,
        email: testUser.email,
        password: bcrypt.hashSync(testUser.password, 8)
      });
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
        res.body.should.have.property('auth');
        res.body.should.have.property('token');
        res.body.auth.should.equal(true);

        chai.request(server)
        .get('/api/auth/me')
        .set('x-access-token', res.body.token)
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
          res.should.have.status(403);
          done();
        });
    });

    it('GET should deny invalid token', function(done) {
      chai.request(server)
        .get('/api/auth/me')
        .set('x-access-token', 'Other token')
        .end(function(err, res){
          res.should.have.status(500);
          done();
        });
    });

  });

});