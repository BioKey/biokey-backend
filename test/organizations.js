var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var Organization = require('../models/organization');
var User = require('../models/user');

var should = chai.should();
chai.use(chaiHttp);

after(function(done) {
  //clear out db
  Organization.remove(function(err) {
    User.remove(function(err) {
      mongoose.connection.close();
      done();
    });
  });
});

describe('Organizations', function() {

  var testOrganization = {
    name: "Wayne Enterprises",
    maxUsers: 100,
    challengeStrategies: [
      "test1",
      "test2"
    ],
    defaultThreshold: 50
  };

  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    isAdmin: true,
    phoneNumber: '555-555-555'
  };

  var testToken;


  beforeEach(function(done) {
    var newOrganization = new Organization(testOrganization);
    newOrganization.save(function(err, data) {

      testOrganization._id = data.id;
      testUser.organization = data.id;

      var newUser = new User(testUser);
      newUser.save(err => {
        testUser._id = newUser.id;
        testToken = newUser.getToken();
        done();
      });

    });
  });

  afterEach(function(done) {
    //clear out db
    Organization.remove(function(err) {
      User.remove(function(err) {
        done();
      });
    });
  });


  let confirmOrganization = (organization, val) => {
    organization.should.be.a('object');
    organization.should.have.property('_id');
    organization.should.have.property('name');
    organization.should.have.property('maxUsers');
    organization._id.should.equal(val._id);
    organization.name.should.equal(val.name);
    organization.maxUsers.should.equal(val.maxUsers);
  };

  describe('/api/organizations', function() {

    let postOrg = {
      name: "HW Inc.",
      maxUsers: 100,
      challengeStrategies: [],
      defaultThreshold: 1
    }

    //GET Testing
    it('GET should list all organizations', function(done) {
      chai.request(server)
        .get('/api/organizations')
        .set('authorization', testToken)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.organizations.should.be.a('array');
          confirmOrganization(res.body.organizations[0], testOrganization);
          done();
        });
    });

    //POST Testing
    it('POST should create a new organization', function(done) {
      chai.request(server)
        .post('/api/organizations')
        .set('authorization', testToken)
        .send({ organization: postOrg })
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          postOrg._id = res.body.organization._id;
          confirmOrganization(res.body.organization, postOrg);
          done();
        });
    });

    it('POST should not create an organization with a duplicate name', function(done) {
      chai.request(server)
        .post('/api/organizations')
        .set('authorization', testToken)
        .send({ organization: postOrg })
        .end(function(err, res) {});
      chai.request(server)
        .post('/api/organizations')
        .set('authorization', testToken)
        .send({ organization: postOrg })
        .end(function(err, res) {
          res.should.have.status(500);
          done();
        });
    });

  });

  describe('/api/organizations/<id>', function() {

    //GET Testing
    it('GET should, when it exists, list one organization', function(done) {
      chai.request(server)
        .get('/api/organizations/' + testOrganization._id)
        .set('authorization', testToken)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          confirmOrganization(res.body.organization, testOrganization);
          done();
        });
    });

    it('GET should not list the requested organization if it does not exist', function(done) {
      chai.request(server)
        .get('/api/organizations/' + mongoose.Types.ObjectId())
        .set('authorization', testToken)
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    //PUT Testing
    it('PUT should update a single organization', function(done) {
      chai.request(server)
        .get('/api/organizations')
        .set('authorization', testToken)
        .end(function(err, res) {
          let orgToUpdate = res.body.organizations[0];
          chai.request(server)
            .put('/api/organizations/' + orgToUpdate._id)
            .set('authorization', testToken)
            .send({
              organization: {
                'name': 'BK Inc.',
                maxUsers: orgToUpdate.maxUsers
              }
            })
            .end(function(error, response) {
              response.should.have.status(200);
              response.should.be.json;
              confirmOrganization(response.body.organization, {
                _id: orgToUpdate._id,
                name: 'BK Inc.',
                maxUsers: orgToUpdate.maxUsers
              });
              done();
            });
        });
    });

    it('PUT should not update the requested organization if it does not exist', function(done) {
      chai.request(server)
        .put('/api/organizations/' + mongoose.Types.ObjectId())
        .set('authorization', testToken)
        .send({})
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    //DELETE Testing
    it('DELETE should delete a single organization', function(done) {
      chai.request(server)
        .get('/api/organizations')
        .set('authorization', testToken)
        .end(function(err, res) {

          res.should.have.status(200);
          res.body.organizations.should.be.a('array');
          res.body.organizations.length.should.equal(1);

          chai.request(server)
            .delete('/api/organizations/' + res.body.organizations[0]._id)
            .set('authorization', testToken)
            .end(function(err2, res2) {

              res2.should.have.status(200);

              chai.request(server)
                .get('/api/organizations')
                .set('authorization', testToken)
                .end(function(err3, res3) {

                  res3.should.have.status(200);
                  res3.body.organizations.should.be.a('array');
                  res3.body.organizations.length.should.equal(0);

                  done();
                });
            });
        });
    });

    it('DELETE should not delete the requested organization if it does not exist', function(done) {
      chai.request(server)
        .delete('/api/organizations/' + mongoose.Types.ObjectId())
        .set('authorization', testToken)
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
});