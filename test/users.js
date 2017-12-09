var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

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

describe('Users', function() {
  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    isAdmin: false
  };

  beforeEach(function(done){
    var newUser = new User(testUser);
    newUser.save(function(err, data) {
      testUser._id = data.id;
      done();
    });
  });
  afterEach(function(done){
    User.collection.drop();
    done();
  });

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

  describe('/api/users', function() {

    it('GET should list ALL users', function(done) {
      chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        confirmUser(res.body[0], testUser);
        done();
      });
    });

  });

  describe('/api/users/<id>', function() {

    it('GET should list a SINGLE user', function(done) {
      chai.request(server)
      .get('/api/users/'+testUser._id)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        confirmUser(res.body, testUser);
        done();
      });
    });

    it('GET should not find invalid user', function(done) {
      chai.request(server)
      .get('/api/users/' + mongoose.Types.ObjectId())
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should update a SINGLE user', function(done) {
      chai.request(server)
      .get('/api/users')
      .end(function(err, res){
        chai.request(server)
        .put('/api/users/'+res.body[0]._id)
        .send({'name': 'Superman'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmUser(response.body, {
            _id: res.body[0]._id,
            name: 'Superman',
            email: res.body[0].email,
            isAdmin: res.body[0].isAdmin
          });
          done();
        });
      });
    });

    it('DELETE should delete a SINGLE user', function(done) {
      chai.request(server)
      .get('/api/users')
      .end(function(err, res){

        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/users/'+res.body[0]._id)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/users')
          .end(function(err3, res3){

            res3.should.have.status(200);
            res3.body.should.be.a('array');
            res3.body.length.should.equal(0);

            done();
          });
        });
      });
    });
    
  });
});