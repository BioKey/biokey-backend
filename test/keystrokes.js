var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');
var Keystroke = require('../models/keystroke');
var TypingProfile = require('../models/typingProfile')

var should = chai.should();
chai.use(chaiHttp);

after(function() {
    //clear out db
    Keystroke.remove(function(err){
      mongoose.connection.close();
      done();    
    });
});

describe('Keystrokes', function(){

  var testKeystroke = {
    character: 'a',
    timestamp: 8008,
    upOrDown: 'U'
  };

  var testTypingProfile = {
    user: mongoose.Types.ObjectId(),
    machine: mongoose.Types.ObjectId(),
    authStatus: false,
    lockStatus: true,
    accessToken: 'token',
    tensorFlowModel: 'tfmodel'
  };

  beforeEach(function(done){
    var newTypingProfile = new TypingProfile(testTypingProfile);
    newTypingProfile.save(function(err, data){
        testTypingProfile._id = data.id;
        testKeystroke.typingProfile = data.id;
    });
    var newKeystroke = new Keystroke(testKeystroke);
    newKeystroke.save(function(err, data){
      testKeystroke._id = data.id;
      done();
    });
  });

  afterEach(function(done){
    Keystroke.collection.drop();
    TypingProfile.collection.drop();
    done();
  });

  let confirmKeystroke = (keystroke, val) => {
    keystroke.should.be.a('object');
    keystroke.should.have.property('_id');
    keystroke.should.have.property('character');
    keystroke.should.have.property('timestamp');
    keystroke.should.have.property('upOrDown');
    keystroke.should.have.property('typingProfile');
    keystroke._id.should.equal(val._id);
    keystroke.character.should.equal(val.character);
    keystroke.timestamp.should.equal(val.timestamp);
    keystroke.upOrDown.should.equal(val.upOrDown);
    keystroke.typingProfile.should.equal(val.typingProfile);
  };

  describe('/api/keystrokes', function(){
    
    let postKeystroke = {
        character: 'b',
        timestamp: 8100,
        upOrDown: 'D'
    };

    //POST Testing
    it('POST should create a new keystroke', function(done){
      postKeystroke.typingProfile = testKeystroke.typingProfile;
      chai.request(server)
      .post('/api/keystrokes')
      .send({keystroke: postKeystroke})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        postKeystroke._id = res.body.keystroke._id;
        confirmKeystroke(res.body.keystroke, postKeystroke);
        done();
      });
    });

    it('POST should not create a keystroke when the typingProfile cannot be found ', function(done){
      postKeystroke.typingProfile = mongoose.Types.ObjectId();
      chai.request(server)
      .post('/api/keystrokes')
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
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    //PUT Testing
    it('PUT should update a single keystroke', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .end(function(err, res){
        chai.request(server)
        .put('/api/keystrokes/'+res.body[0]._id)
        .send({keystroke: {
          'character': 'c',
          'timestamp': 9000,
          'upOrDown': 'U',
          'typingProfile': res.body[0].typingProfile
        }})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          confirmKeystroke(response.body.updated, {
            _id: res.body[0]._id,
            'character': 'c',
            'timestamp': 9000,
            'upOrDown': 'U',
            'typingProfile': res.body[0].typingProfile
          });
          done();
        });
      });
    });

    it('PUT should not update the requested keystroke if it does not exist', function(done){
      chai.request(server)
      .put('/api/keystrokes/' + mongoose.Types.ObjectId())
      .send({})
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });

    it('PUT should not update the keystroke if the typingProfile cannot be found', function(done){
        chai.request(server)
        .get('/api/keystrokes')
        .end(function(err, res){
          chai.request(server)
          .put('/api/keystrokes/'+res.body[0]._id)
          .send({keystroke: {
            'character': 'c',
            'timestamp': 9000,
            'upOrDown': 'U',
            'typingProfile': mongoose.Types.ObjectId()
          }})
          .end(function(error, response){
            response.should.have.status(404);
            done();
          });
        });
      });

    //DELETE Testing
    it('DELETE should delete a single keystroke', function(done){
      chai.request(server)
      .get('/api/keystrokes')
      .end(function(err, res){

        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.equal(1);

        chai.request(server)
        .delete('/api/keystrokes/'+res.body[0]._id)
        .end(function(err2, res2){

          res2.should.have.status(200);

          chai.request(server)
          .get('/api/keystrokes')
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
      .end(function(err, res){
        res.should.have.status(404);
        done();
      });
    });
  });
});
