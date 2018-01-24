var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var Machine = require('../models/machine');
var Organization = require('../models/organization');
var User = require('../models/user');

var should = chai.should();
chai.use(chaiHttp);

after(function() {
    //clear out db
    Machine.remove(function(err){
      Organization.remove(function(err){
        User.remove(function(err){
          mongoose.connection.close();
          done(); 
        });
      });   
    });
});

describe('Machines', function(){

  var testMachine = {
    mac: 'testmacaddress1'
  };

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
    organization: mongoose.Types.ObjectId()
  };

  var testToken;

  beforeEach(function(done){
    var newUser = new User(testUser);
    chai.request(server)
    .post('/api/auth/register')
    .send(newUser)
    .end(function(err, res){
      testToken = res.body.token;
      var newOrganization = new Organization(testOrganization);
      newOrganization.save(function(err, data){
          testOrganization._id = data.id;
          testMachine.organization = data.id;
      });
      var newMachine = new Machine(testMachine);
      newMachine.save(function(err, data){
        testMachine._id = data.id;
        done();
      });
    });
  });

  afterEach(function(done){
    Machine.collection.drop();
    Organization.collection.drop();
    User.collection.drop();
    done();
  });

  let confirmMachine = (machine, val) => {
    machine.should.be.a('object');
    machine.should.have.property('_id');
    machine.should.have.property('mac');
    machine.should.have.property('organization');
    machine._id.should.equal(val._id);
    machine.mac.should.equal(val.mac);
    machine.organization.should.equal(val.organization);
  };

  describe('/api/machines', function(){
    
    let postMachine = {
        mac: 'testmacaddress2'
    };

    //POST Testing
    it('POST should create a new machine', function(done){
      postMachine.organization = testMachine.organization;
      chai.request(server)
      .post('/api/machines')
      .set('authorization', testToken)
      .send({machine: postMachine})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        postMachine._id = res.body.machine._id;
        confirmMachine(res.body.machine, postMachine);
        done();
      });
    });

    it('POST should not create a machine with a duplicate mac', function(done){
      chai.request(server)
      .post('/api/machines')
      .set('authorization', testToken)
      .send({machine: postMachine})
      .end(function(err, res){ });
      chai.request(server)
      .post('/api/machines')
      .set('authorization', testToken)
      .send({machine: postMachine})
      .end(function(err, res){
        res.should.have.status(500);
        done();
      });
    });

    it('POST should not create a machine when the organization cannot be found ', function(done){
      postMachine.organization = mongoose.Types.ObjectId();
      chai.request(server)
      .post('/api/machines')
      .set('authorization', testToken)
      .send({machine: postMachine})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //GET Testing
    it('GET should list all machines', function(done){
      chai.request(server)
      .get('/api/machines')
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        confirmMachine(res.body[0], testMachine);
        done();
      });
    });
  });

  describe('/api/machines/<id>', function(){
    
    //GET Testing
    it('GET should, when it exists, list one machine', function(done){
      chai.request(server)
      .get('/api/machines/'+testMachine._id)
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        confirmMachine(res.body.machine, testMachine);
        done();
      });
    });

    it('GET should not list the requested machine if it does not exist', function(done){
      chai.request(server)
      .get('/api/machines/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //PUT Testing
    it('PUT should update a single machine', function(done){
      chai.request(server)
      .get('/api/machines')
      .set('authorization', testToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/machines/'+res.body[0]._id)
        .set('authorization', testToken)
        .send({machine: {
          'mac': 'Updated mac',
          'organization': res.body[0].organization
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmMachine(response.body.updated, {
            _id: res.body[0]._id,
            'mac': 'Updated mac',
            'organization': res.body[0].organization
          });
          done();
        });
      });
    });

    it('PUT should not update the requested machine if it does not exist', function(done){
      chai.request(server)
      .put('/api/machines/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .send({})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should not update the machine if the organization cannot be found', function(done){
        chai.request(server)
        .get('/api/machines')
        .set('authorization', testToken)
        .end(function(err, res){
          chai.request(server)
          .put('/api/machines/'+res.body[0]._id)
          .set('authorization', testToken)
          .send({machine: {
            'mac': 'Updated mac',
            'organization': mongoose.Types.ObjectId()
          }})
          .end(function(error, response){
            response.should.have.status(404);
            done();
          });
        });
      });

    //DELETE Testing
    it('DELETE should delete a single machine', function(done){
      chai.request(server)
      .get('/api/machines')
      .set('authorization', testToken)
      .end(function(err, res){

        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/machines/'+res.body[0]._id)
        .set('authorization', testToken)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/machines')
          .set('authorization', testToken)
          .end(function(err3, res3){

            res3.should.have.status(200);
            res3.body.should.be.a('array');
            res3.body.length.should.equal(0);

            done();
          });
        });
      });
    });

    it('DELETE should not delete the requested machine if it does not exist', function(done){
      chai.request(server)
      .delete('/api/machines/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });
  });
});
