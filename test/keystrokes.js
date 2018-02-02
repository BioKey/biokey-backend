var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var Keystroke = require('../models/keystroke');
var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');
const Organization = require('../models/organization');

var should = chai.should();
chai.use(chaiHttp);

after(function(done) {
  //clear out db
  Keystroke.remove(function(err){
    TypingProfile.remove(function(err){
      Organization.remove(function(err) {
        User.remove(function(err){
          mongoose.connection.close();
          done(); 
        });
      })
    });   
  });
});
describe('Keystrokes', function(){

  var testUser = {
    name: 'Batman',
    email: 'batman@gotham.co',
    password: 'test',
    phoneNumber: '555-555-555',
    organization: mongoose.Types.ObjectId(),
    isAdmin: true
  };

  var testKeystroke = {
    character: 'a',
    timestamp: 8008,
    keyDown: false
  };

  var testTypingProfile = {
    machine: mongoose.Types.ObjectId(),
    authStatus: false,
    lockStatus: true,
    tensorFlowModel: 'tfmodel'
  };

  before(function(done){
    var newUser = new User(testUser);
    chai.request(server)
    .post('/api/auth/register')
    .send(newUser)
    .end(function(err, res){
      testUser.accessToken = res.body.token;

      var newTypingProfile = new TypingProfile(testTypingProfile);
      newTypingProfile.save(function(err, data){
        testKeystroke.typingProfile = data._id;
        done();
      });
    });
  });

  beforeEach(function(done){
    var newKeystroke = new Keystroke(testKeystroke);
    newKeystroke.save(function(err, data){
      testKeystroke._id = data.id;
      done();
    });
  });

  afterEach(function(done){
    Keystroke.remove({}, function(err) {
      done();
    });
    
  });

  after(function(done){
    User.remove({}, (err) => {
      TypingProfile.remove({}, (err) => {
        done();
      });
    });
  });


  let confirmKeystroke = (keystroke, val) => {
    keystroke.should.be.a('object');
    keystroke.should.have.property('_id');
    keystroke.should.have.property('character');
    keystroke.should.have.property('timestamp');
    keystroke.should.have.property('keyDown');
    keystroke.should.have.property('typingProfile');
    keystroke._id.should.equal(val._id);
    keystroke.character.should.equal(val.character);
    keystroke.timestamp.should.equal(val.timestamp);
    keystroke.keyDown.should.equal(val.keyDown);
    keystroke.typingProfile.should.equal(val.typingProfile.toString());
  };

  describe('/api/keystrokes', function(){

    let postKeystroke = {
      character: 'b',
      timestamp: 8100,
      keyDown: true
    };

    let otherPostKeystroke = {
      character: 'c',
      timestamp: 8101,
      keyDown: true
    };

    //POST Testing
    it('POST should create a new keystroke', function(done){
      postKeystroke.typingProfile = testKeystroke.typingProfile;
      chai.request(server)
      .post('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .send({keystroke: postKeystroke})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        postKeystroke._id = res.body.keystrokes[0]._id;
        confirmKeystroke(res.body.keystrokes[0], postKeystroke);
        done();
      });
    });

    it('POST should create many new keystrokes', function(done){
      postKeystroke.typingProfile = testKeystroke.typingProfile;
      otherPostKeystroke.typingProfile = testKeystroke.typingProfile;
      chai.request(server)
      .post('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .send({keystrokes: [postKeystroke, otherPostKeystroke]})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.keystrokes.length.should.equal(2);
        done();
      });
    });

    it('POST should not create many new keystrokes if any is bad', function(done){
      postKeystroke.typingProfile = testKeystroke.typingProfile;
      chai.request(server)
      .post('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .send({keystroke: [postKeystroke, {}, postKeystroke]})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('POST should not create a keystroke when the typingProfile cannot be found ', function(done){
      postKeystroke.typingProfile = mongoose.Types.ObjectId();
      chai.request(server)
      .post('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .send({keystroke: postKeystroke})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //GET Testing
    it('GET should list all keystrokes', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        confirmKeystroke(res.body[0], testKeystroke);
        done();
      });
    });
  });

  describe('/api/keystrokes/<id>', function(){

    //GET Testing
    it('GET should, when it exists, list one keystroke', function(done){
      chai.request(server)
      .get('/api/keystrokes/'+testKeystroke._id)
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        confirmKeystroke(res.body.keystroke, testKeystroke);
        done();
      });
    });

    it('GET should not list the requested keystroke if it does not exist', function(done){
      chai.request(server)
      .get('/api/keystrokes/' + mongoose.Types.ObjectId())
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //PUT Testing
    it('PUT should update a single keystroke', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/keystrokes/'+res.body[0]._id)
        .set('authorization', testUser.accessToken)
        .send({keystroke: {
          'character': 'c',
          'timestamp': 9000,
          'keyDown': false,
          'typingProfile': res.body[0].typingProfile
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmKeystroke(response.body.updated, {
            _id: res.body[0]._id,
            'character': 'c',
            'timestamp': 9000,
            'keyDown': false,
            'typingProfile': res.body[0].typingProfile
          });
          done();
        });
      });
    });

    it('PUT should not update the requested keystroke if it does not exist', function(done){
      chai.request(server)
      .put('/api/keystrokes/' + mongoose.Types.ObjectId())
      .set('authorization', testUser.accessToken)
      .send({})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should not update the keystroke if the typingProfile cannot be found', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/keystrokes/'+res.body[0]._id)
        .set('authorization', testUser.accessToken)
        .send({keystroke: {
          'character': 'c',
          'timestamp': 9000,
          'keyDown': false,
          'typingProfile': mongoose.Types.ObjectId()
        }})
        .end(function(error, response){
          response.should.have.status(404);
          done();
        });
      });
    });
    
    it('PUT should not update the requested keystroke if the auth header is invalid', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        chai.request(server)
        .put('/api/keystrokes/'+res.body[0]._id)
        .set('authorization', testUser.accessToken+"a")
        .send({})
        .end(function(error, response){
          response.should.have.status(401);
          done();
        });
      });
    });

    //DELETE Testing
    it('DELETE should delete a single keystroke', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .set('authorization', testUser.accessToken)
      .end(function(err, res){

        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/keystrokes/'+res.body[0]._id)
        .set('authorization', testUser.accessToken)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/keystrokes')
          .set('authorization', testUser.accessToken)
          .end(function(err3, res3){

            res3.should.have.status(200);
            res3.body.should.be.a('array');
            res3.body.length.should.equal(0);

            done();
          });
        });
      });
    });

    it('DELETE should not delete the requested keystroke if it does not exist', function(done){
      chai.request(server)
      .delete('/api/keystrokes/' + mongoose.Types.ObjectId())
      .set('authorization', testUser.accessToken)
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });


    it('PUT should not update the requested keystroke if the user is not an admin', function(done){
      chai.request(server)
        //Get keystroke to update
        .get('/api/keystrokes')
        .set('authorization', testUser.accessToken)
        .end(function(err, response){
          //Get user
          chai.request(server)
          .get('/api/users')
          .set('authorization', testUser.accessToken)
          .end(function(error, response2){
            //Update user to non-admin
            testUser.isAdmin = false;
            chai.request(server)
            .put('/api/users/'+response2.body[0]._id)
            .set('authorization', testUser.accessToken)
            .send(testUser)
            .end(function(error, response3){
              //Attempt to update the keystroke
              chai.request(server)
              .put('/api/keystrokes/'+response.body[0]._id)
              .set('authorization', testUser.accessToken)
              .send({})
              .end(function(error, response4){
                response4.should.have.status(401);
                done();
              });
            });
          });
        });
      });
  });
});
