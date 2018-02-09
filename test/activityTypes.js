var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var ActivityType = require('../models/activityType');
var User = require('../models/user');
var Organization = require('../models/organization');

var should = chai.should();
chai.use(chaiHttp);


after(function(done) {
  //clear out db
  Organization.remove(function(err) {
    ActivityType.remove(function(err){
      User.remove(function(err){
        mongoose.connection.close();
        done(); 
      });   
    });
  });
});

describe('ActivityTypes', function(){

  var testActivityType = {
    description: 'Lockout',
    importance: 'HIGH'
  };

  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    isAdmin: true,
    phoneNumber: '555-555-555',
    endpoint: 'example.com/api/6b3b015129015e0a8b9c1649',
    organization: mongoose.Types.ObjectId()
  };

  var testToken;

  before(function(done) {
    var newUser = new User(testUser);
    newUser.save(err => {
      testUser._id = newUser.id;
      testToken = newUser.getToken();
      done();
    });
  })
  
  beforeEach(function(done){
    var newActivityType = new ActivityType(testActivityType);
    newActivityType.save(function(err, data){
      testActivityType._id = data.id;
      done();
    });
  });

  afterEach(function(done){
    //clear out db
    ActivityType.remove(err => {
      done();
    });
  });

  let confirmActivityType = (activityType, val) => {
    activityType.should.be.a('object');
    activityType.should.have.property('_id');
    activityType.should.have.property('description');
    activityType.should.have.property('importance');
    activityType._id.should.equal(val._id);
    activityType.description.should.equal(val.description);
    activityType.importance.should.equal(val.importance);
  };

  describe('/api/activityTypes', function(){

    let postActivityType = {
      description: 'Unlocked by admin',
      importance: 'LOW'
    };

    //POST Testing
    it('POST should create a new activityType', function(done){
      chai.request(server)
      .post('/api/activityTypes')
      .set('authorization', testToken)
      .send({activityType: postActivityType})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        postActivityType._id = res.body.activityType._id;
        confirmActivityType(res.body.activityType, postActivityType);
        done();
      });
    });

    it('POST should not create an activityType with a duplicate description', function(done){
      chai.request(server)
      .post('/api/activityTypes')
      .set('authorization', testToken)
      .send({activityType: postActivityType})
      .end(function(err, res){ });
      chai.request(server)
      .post('/api/activityTypes')
      .set('authorization', testToken)
      .send({activityType: postActivityType})
      .end(function(err, res){
        res.should.have.status(500);
        done();
      });
    });

    //GET Testing
    it('GET should list all activityTypes', function(done){
      chai.request(server)
      .get('/api/activityTypes')
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.activityTypes.should.be.a('array');
        confirmActivityType(res.body.activityTypes[0], testActivityType);
        done();
      });
    });
  });

  describe('/api/activityTypes/<id>', function(){

    //GET Testing
    it('GET should, when it exists, list one activityType', function(done){
      chai.request(server)
      .get('/api/activityTypes/'+testActivityType._id)
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        confirmActivityType(res.body.activityType, testActivityType);
        done();
      });
    });

    it('GET should not list the requested activityType if it does not exist', function(done){
      chai.request(server)
      .get('/api/activityTypes/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //PUT Testing
    it('PUT should update a single activityType', function(done){
      chai.request(server)
      .get('/api/activityTypes')
      .set('authorization', testToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/activityTypes/'+res.body.activityTypes[0]._id)
        .set('authorization', testToken)
        .send({activityType: {
          'description': 'Updated lockout',
          'importance': res.body.activityTypes[0].importance
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmActivityType(response.body.activityType, {
            _id: res.body.activityTypes[0]._id,
            'description': 'Updated lockout',
            'importance': res.body.activityTypes[0].importance
          });
          done();
        });
      });
    });

    it('PUT should not update the requested activityType if it does not exist', function(done){
      chai.request(server)
      .put('/api/activityTypes/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .send({})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //DELETE Testing
    it('DELETE should delete a single activityType', function(done){
      chai.request(server)
      .get('/api/activityTypes')
      .set('authorization', testToken)
      .end(function(err, res){

        res.should.have.status(200);
        res.body.activityTypes.should.be.a('array');
        res.body.activityTypes.length.should.equal(1);

        chai.request(server)
        .delete('/api/activityTypes/'+res.body.activityTypes[0]._id)
        .set('authorization', testToken)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/activityTypes')
          .set('authorization', testToken)
          .end(function(err3, res3){

            res3.should.have.status(200);
            res3.body.activityTypes.should.be.a('array');
            res3.body.activityTypes.length.should.equal(0);

            done();
          });
        });
      });
    });

    it('DELETE should not delete the requested activityType if it does not exist', function(done){
      chai.request(server)
      .delete('/api/activityTypes/' + mongoose.Types.ObjectId())
      .set('authorization', testToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });
  });
});
