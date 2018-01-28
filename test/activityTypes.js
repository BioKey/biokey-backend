var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var ActivityType = require('../models/activityType');
var User = require('../models/user');

var should = chai.should();
chai.use(chaiHttp);

after(function() {
    //clear out db
    ActivityType.remove(function(err){
      User.remove(function(err){
        mongoose.connection.close();
        done(); 
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
      var newActivityType = new ActivityType(testActivityType);
      newActivityType.save(function(err, data){
        testActivityType._id = data.id;
        done();
      });
    });
  });

  afterEach(function(done){
    ActivityType.collection.drop();
    User.collection.drop();
    done();
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
        res.body.should.be.a('array');
        confirmActivityType(res.body[0], testActivityType);
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
        .put('/api/activityTypes/'+res.body[0]._id)
        .set('authorization', testToken)
        .send({activityType: {
          'description': 'Updated lockout',
          'importance': res.body[0].importance
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmActivityType(response.body.updated, {
            _id: res.body[0]._id,
            'description': 'Updated lockout',
            'importance': res.body[0].importance
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
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/activityTypes/'+res.body[0]._id)
        .set('authorization', testToken)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/activityTypes')
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
