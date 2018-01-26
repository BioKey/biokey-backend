var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var User = require('../models/user');
var Activity = require('../models/activity');
var TypingProfile = require('../models/typingProfile');
var ActivityType = require('../models/activityType');

var should = chai.should();
chai.use(chaiHttp);

after(function() {
    //clear out db
    Activity.remove(function(err){
      TypingProfile.remove(function(err){
        ActivityType.remove(function(err){
          User.remove(function(err){
            mongoose.connection.close();
            done(); 
          });
        });  
      }); 
    });
});

describe('Activities', function(){

  var testActivity = {
    timestamp: 8008
  };

  var testTypingProfile = {
    authStatus: false,
    lockStatus: true,
    tensorFlowModel: 'tfmodel',
    machine: mongoose.Types.ObjectId()
  };

  var testActivityType = {
    description: 'description',
    importance: 'LOW'
  };

  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    isAdmin: true,
    organization: mongoose.Types.ObjectId()
  };

  beforeEach(function(done){
    var newUser = new User(testUser);
    chai.request(server)
    .post('/api/auth/register')
    .send(newUser)
    .end(function(err, res){

      testTypingProfile.accessToken = res.body.token;

      User.findOne({email: testUser.email}, function(err, user){

        //Getting user id
        testUser._id = user._id;
        testTypingProfile.user =  user._id
        
        var newTypingProfile = new TypingProfile(testTypingProfile);
        newTypingProfile.save(function(err, data){
          //Getting activity id
          testActivity.typingProfile = data.id;
          testTypingProfile._id = data.id

          var newActivityType = new ActivityType(testActivityType);
          newActivityType.save(function(err, data){
              //Getting activity type id
              testActivityType._id = data.id;
              testActivity.activityType = data.id;

              var newActivity = new Activity(testActivity);
              newActivity.save(function(err, data){
                //Getting activity id
                testActivity._id = data.id;
                done();
             });
          });
        });
      });
    });
  });

  afterEach(function(done){
    Activity.collection.drop();
    TypingProfile.collection.drop();
    User.collection.drop();
    ActivityType.collection.drop();
    done();
  });

  let confirmActivity = (activity, val) => {
    activity.should.be.a('object');
    activity.should.have.property('_id');
    activity.should.have.property('timestamp');
    activity.should.have.property('activityType');
    activity.should.have.property('typingProfile');
    activity._id.should.equal(val._id);
    activity.timestamp.should.equal(val.timestamp);
    activity.activityType.should.equal(val.activityType);
    activity.typingProfile.should.equal(val.typingProfile);
  };

  describe('/api/activities', function(){
    
    let postActivity = {
        timestamp: 8100
    };

    //POST Testing
    it('POST should create a new activity', function(done){
      postActivity.typingProfile = testActivity.typingProfile;
      postActivity.activityType = testActivity.activityType;
      chai.request(server)
      .post('/api/activities')
      .set('authorization', testTypingProfile.accessToken)
      .send({activity: postActivity})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        postActivity._id = res.body.activity._id;
        confirmActivity(res.body.activity, postActivity);
        done();
      });
    });

    it('POST should not create a activity when the typingProfile cannot be found ', function(done){
      postActivity.typingProfile = mongoose.Types.ObjectId();
      postActivity.activityType = testActivity.activityType;
      chai.request(server)
      .post('/api/activities')
      .set('authorization', testTypingProfile.accessToken)
      .send({activity: postActivity})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('POST should not create a activity when the activityType cannot be found ', function(done){
        postActivity.typingProfile = testActivity.typingProfile;
        postActivity.activityType = mongoose.Types.ObjectId();
        chai.request(server)
        .post('/api/activities')
        .set('authorization', testTypingProfile.accessToken)
        .send({activity: postActivity})
        .end(function(err, res){
          res.should.have.status(404);
          done();
        });
    });

    //GET Testing
    it('GET should list all activities', function(done){
      chai.request(server)
      .get('/api/activities')
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        confirmActivity(res.body[0], testActivity);
        done();
      });
    });
  });

  describe('/api/activities/<id>', function(){
    
    //GET Testing
    it('GET should, when it exists, list one activity', function(done){
      chai.request(server)
      .get('/api/activities/'+testActivity._id)
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        confirmActivity(res.body.activity, testActivity);
        done();
      });
    });

    it('GET should not list the requested activity if it does not exist', function(done){
      chai.request(server)
      .get('/api/activities/' + mongoose.Types.ObjectId())
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //PUT Testing
    it('PUT should update a single activity', function(done){
      chai.request(server)
      .get('/api/activities')
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/activities/'+res.body[0]._id)
        .set('authorization', testTypingProfile.accessToken)
        .send({activity: {
          'timestamp': 9000,
          'typingProfile': res.body[0].typingProfile,
          'activityType': res.body[0].activityType
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmActivity(response.body.updated, {
            _id: res.body[0]._id,
            'timestamp': 9000,
            'typingProfile': res.body[0].typingProfile,
            'activityType': res.body[0].activityType
          });
          done();
        });
      });
    });

    it('PUT should not update the requested activity if it does not exist', function(done){
      chai.request(server)
      .put('/api/activities/' + mongoose.Types.ObjectId())
      .set('authorization', testTypingProfile.accessToken)
      .send({})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should not update the activity if the typingProfile cannot be found', function(done){
        chai.request(server)
        .get('/api/activities')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res){
          chai.request(server)
          .put('/api/activities/'+res.body[0]._id)
          .set('authorization', testTypingProfile.accessToken)
          .send({activity: {
            'character': 'c',
            'timestamp': 9000,
            'upOrDown': 'U',
            'typingProfile': mongoose.Types.ObjectId(),
            'activityType': res.body[0].activityType
          }})
          .end(function(error, response){
            response.should.have.status(404);
            done();
          });
        });
      });

      it('PUT should not update the activity if the activityType cannot be found', function(done){
        chai.request(server)
        .get('/api/activities')
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err, res){
          chai.request(server)
          .put('/api/activities/'+res.body[0]._id)
          .set('authorization', testTypingProfile.accessToken)
          .send({activity: {
            'character': 'c',
            'timestamp': 9000,
            'upOrDown': 'U',
            'typingProfile': res.body[0].typingProfile,
            'activityType': mongoose.Types.ObjectId()
          }})
          .end(function(error, response){
            response.should.have.status(404);
            done();
          });
        });
      });

    //DELETE Testing
    it('DELETE should delete a single activity', function(done){
      chai.request(server)
      .get('/api/activities')
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){

        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/activities/'+res.body[0]._id)
        .set('authorization', testTypingProfile.accessToken)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/activities')
          .set('authorization', testTypingProfile.accessToken)
          .end(function(err3, res3){

            res3.should.have.status(200);
            res3.body.should.be.a('array');
            res3.body.length.should.equal(0);

            done();
          });
        });
      });
    });

    it('DELETE should not delete the requested activity if it does not exist', function(done){
      chai.request(server)
      .delete('/api/activities/' + mongoose.Types.ObjectId())
      .set('authorization', testTypingProfile.accessToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });
  });
});
