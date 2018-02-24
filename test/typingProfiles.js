var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');
var Machine = require('../models/machine');
var Organization = require('../models/organization');

var should = chai.should();
chai.use(chaiHttp);

after(function(done) {
  //clear out db
  TypingProfile.remove(function(err) {
    User.remove(function(err) {
      Machine.remove(function(err) {
        Organization.remove(function(err) {
          mongoose.connection.close();
          done();
        });
      });
    });
  });
});

describe('TypingProfiles', function() {

  var testTypingProfile = {
    isLocked: false,
    tensorFlowModel: 'tfmodel',
    threshold: 1,
    lastHeartbeat: Date.now()
  };

  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    isAdmin: true,
    phoneNumber: '555-555-555',
    organization: mongoose.Types.ObjectId()
  };

  var testMachine = {
    mac: 'macaddress',
    organization: mongoose.Types.ObjectId()
  };

  var testOrganization = {
    name: 'BK Inc.',
    maxUsers: 100
  }

  before(done => {
    var newUser = new User(testUser);
    chai.request(server)
      .post('/api/auth/register')
      .send(newUser)
      .end(function(err, res) {
        testTypingProfile.accessToken = res.body.token;
        User.findOne({ email: testUser.email }, function(err, user) {
          testUser._id = user.id;
          testTypingProfile.user = user.id;

          var newOrganization = new Organization(testOrganization);
          newOrganization.save(function(err, data) {
            testMachine.organization = data.id;
            testUser.organization = data.id;
            testOrganization._id = data.id;

            var newMachine = new Machine(testMachine);
            newMachine.save(function(err, data) {
              testMachine._id = data.id;
              testTypingProfile.machine = data.id;
              done();
            });
          });
        });
      });
  })

  beforeEach(function(done) {
    var newTypingProfile = new TypingProfile(testTypingProfile);
    newTypingProfile.save(function(err, data) {
      testTypingProfile._id = data.id;
      done();
    });
  });

  afterEach(done => {
    TypingProfile.remove(err => {
      done();
    });
  });

  after(function(done) {
    //clear out db
    User.remove(function(err) {
      Machine.remove(function(err) {
        Organization.remove(function(err) {
          done();
        });
      });
    });
  });

  let confirmTypingProfile = (typingProfile, val) => {
    typingProfile.should.be.a('object');
    typingProfile.should.have.property('_id');
    typingProfile.should.have.property('isLocked');
    typingProfile.should.have.property('tensorFlowModel');
    typingProfile.should.have.property('machine');
    typingProfile.should.have.property('user');
    typingProfile._id.should.equal(val._id);
    typingProfile.isLocked.should.equal(val.isLocked);
    typingProfile.tensorFlowModel.should.equal(val.tensorFlowModel);
    typingProfile.machine.should.equal(val.machine);
    typingProfile.user.should.equal(val.user);
  };

  describe('/api/typingProfiles', function() {

    let postTypingProfile = {
      isLocked: true,
      tensorFlowModel: 'anothertfmodel'
    };

    //POST Testing
    it('POST should create a new typingProfile', function(done) {
      //Need to save a new user
      testUser.email = 'new email';
      testUser._id = mongoose.Types.ObjectId();
      var newUser = new User(testUser);
      newUser.save(function(err, data) {
        testUser._id = data.id;
        testTypingProfile.user = data.id;
        postTypingProfile.user = testTypingProfile.user;
        postTypingProfile.machine = testTypingProfile.machine;

        chai.request(server)
          .post('/api/typingProfiles')
          .set('authorization', testTypingProfile.accessToken)
          .send({ typingProfile: postTypingProfile })
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            postTypingProfile._id = res.body.typingProfile._id;
            confirmTypingProfile(res.body.typingProfile, postTypingProfile);
            done();
          });
      });

    });

    it('POST should not create a typingProfile when the user cannot be found ', function(done) {
      postTypingProfile.user = mongoose.Types.ObjectId();
      postTypingProfile.machine = testTypingProfile.machine;
      chai.request(server)
        .post('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .send({ typingProfile: postTypingProfile })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    it('POST should not create a typingProfile when the machine cannot be found ', function(done) {
      postTypingProfile.user = testTypingProfile.user;
      postTypingProfile.machine = mongoose.Types.ObjectId();
      chai.request(server)
        .post('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .send({ typingProfile: postTypingProfile })
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    //GET Testing
    it('GET should list all typingProfiles', function(done) {
      chai.request(server)
        .get('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.typingProfiles.should.be.a('array');
          confirmTypingProfile(res.body.typingProfiles[0], testTypingProfile);
          done();
        });
    });
  });

  describe('/api/typingProfiles/<id>', function() {

    //GET Testing
    it('GET should, when it exists, list one typingProfile', function(done) {
      chai.request(server)
        .get('/api/typingProfiles/' + testTypingProfile._id)
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          confirmTypingProfile(res.body.typingProfile, testTypingProfile);
          done();
        });
    });

    it('GET should not list the requested typingProfile if it does not exist', function(done) {
      chai.request(server)
        .get('/api/typingProfiles/' + mongoose.Types.ObjectId())
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });

    //PUT Testing
    it('PUT should update a single typingProfile', function(done) {
      chai.request(server)
        .get('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          chai.request(server)
            .put('/api/typingProfiles/' + res.body.typingProfiles[0]._id)
            .set('authorization', testTypingProfile.accessToken)
            .send({
              typingProfile: {
                isLocked: true,
                tensorFlowModel: 'anothertfmodel',
                user: res.body.typingProfiles[0].user,
                machine: res.body.typingProfiles[0].machine,
                challengeStrategies: [],
                threshold: [1]
              }
            })
            .end(function(error, response) {
              response.should.have.status(200);
              response.should.be.json;
              confirmTypingProfile(response.body.typingProfile, {
                _id: res.body.typingProfiles[0]._id,
                tensorFlowModel: 'anothertfmodel',
                'timestamp': 9000,
                'isLocked': true,
                'user': res.body.typingProfiles[0].user,
                'machine': res.body.typingProfiles[0].machine
              });
              done();
            });
        });
    });

    it('PUT should not update the requested typingProfile if it does not exist', function(done) {
      chai.request(server)
        .put('/api/typingProfiles/' + mongoose.Types.ObjectId())
        .set('authorization', testTypingProfile.accessToken)
        .send({ user: mongoose.Types.ObjectId(), machine: mongoose.Types.ObjectId() })
        .end(function(err, res) {
          res.should.have.status(500);
          done();
        });
    });

    it('PUT should not update the typingProfile if the user cannot be found', function(done) {
      chai.request(server)
        .get('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          chai.request(server)
            .put('/api/typingProfiles/' + res.body.typingProfiles[0]._id)
            .set('authorization', testTypingProfile.accessToken)
            .send({
              typingProfile: {
                'character': 'c',
                'timestamp': 9000,
                'upOrDown': 'U',
                'isLocked': true,
                'user': mongoose.Types.ObjectId(),
                'machine': res.body.typingProfiles[0].machine
              }
            })
            .end(function(error, response) {
              response.should.have.status(404);
              done();
            });
        });
    });

    it('PUT should not update the typingProfile if the machine cannot be found', function(done) {
      chai.request(server)
        .get('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          chai.request(server)
            .put('/api/typingProfiles/' + res.body.typingProfiles[0]._id)
            .set('authorization', testTypingProfile.accessToken)
            .send({
              typingProfile: {
                'character': 'c',
                'timestamp': 9000,
                'upOrDown': 'U',
                'isLocked': true,
                'user': res.body.typingProfiles[0].user,
                'machine': mongoose.Types.ObjectId()
              }
            })
            .end(function(error, response) {
              response.should.have.status(404);
              done();
            });
        });
    });

    //DELETE Testing
    it('DELETE should delete a single typingProfile', function(done) {
      chai.request(server)
        .get('/api/typingProfiles')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {

          res.should.have.status(200);
          res.body.typingProfiles.should.be.a('array');
          res.body.typingProfiles.length.should.equal(1);

          chai.request(server)
            .delete('/api/typingProfiles/' + res.body.typingProfiles[0]._id)
            .set('authorization', testTypingProfile.accessToken)
            .end(function(err2, res2) {

              res2.should.have.status(200);

              chai.request(server)
                .get('/api/typingProfiles')
                .set('authorization', testTypingProfile.accessToken)
                .end(function(err3, res3) {

                  res3.should.have.status(200);
                  res3.body.typingProfiles.should.be.a('array');
                  res3.body.typingProfiles.length.should.equal(0);

                  done();
                });
            });
        });
    });

    it('DELETE should not delete the requested typingProfile if it does not exist', function(done) {
      chai.request(server)
        .delete('/api/typingProfiles/' + mongoose.Types.ObjectId())
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res) {
          res.should.have.status(404);
          done();
        });
    });
  });
});