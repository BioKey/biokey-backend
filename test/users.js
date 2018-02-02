var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var User = require('../models/user');
var Organization = require('../models/organization');

var should = chai.should();
chai.use(chaiHttp);

let testOrg;
let testUser;

after(function(done) {
  //clear out db
  User.remove(err => {
    Organization.remove(err => {
      mongoose.connection.close();
      done();
    })
  })
});

describe('Users', function() {

  var testToken;

  before(function(done) {
    let testOrg = new Organization({
      name: 'Test Org'
    });
    testOrg.save(err => {
      testUser = {
        name: 'Batman',
        email: 'batman@gotham.co',
        password: 'test',
        phoneNumber: '555-555-555',
        organization: testOrg.id.toString(),
        isAdmin: true
      };
      done();
    });
  })

  beforeEach(function(done){
    var newUser = new User(testUser);
    newUser.save(err => {
      testUser._id = newUser.id;
      testToken = newUser.getToken();
      done();
    });
  });

  afterEach(function(done){
    User.remove(err => {
      done()
    })
  });



  let confirmUser = (user, val) => {
    user.should.be.a('object');
    user.should.have.property('_id');
    user.should.have.property('name');
    user.should.have.property('email');
    user.should.have.property('isAdmin');
    user.should.have.property('phoneNumber');
    user.should.have.property('organization');
    user.should.not.have.property('password');
    // Check properties
    user._id.should.equal(val._id);
    user.name.should.equal(val.name);
    user.email.should.equal(val.email);
    user.isAdmin.should.equal(val.isAdmin);
    user.phoneNumber.should.equal(val.phoneNumber);
    user.organization.should.equal(val.organization);
  }

  describe('/api/users', function() {

    it('GET should list ALL users', function(done) {
      chai.request(server)
      .get('/api/users')
      .set('authorization', testToken)
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
      .set('authorization', testToken)
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
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should update a SINGLE user', function(done) {
      chai.request(server)
      .get('/api/users')
      .set('authorization', testToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/users/'+res.body[0]._id)
        .set('authorization', testToken)
        .send({'name': 'Superman'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmUser(response.body, {
            _id: res.body[0]._id,
            name: 'Superman',
            email: res.body[0].email,
            isAdmin: res.body[0].isAdmin,
            phoneNumber: res.body[0].phoneNumber,
            organization: res.body[0].organization
          });
          done();
        });
      });
    });

    it('DELETE should delete a SINGLE user', function(done) {
      //Must save a second user
      testUser.email = 'joker@anarchy.co';
      var newUser = new User(testUser);
      newUser.save(err => {
        chai.request(server)
        .delete('/api/users/'+newUser.id)
        .set('authorization', testToken)
        .end(function(err2, res2) {
          res2.should.have.status(200);
          User.findById(newUser.id, function(err, user) {
            chai.should(user, null);
            done()
          })
        })
      });
    });
  });
});