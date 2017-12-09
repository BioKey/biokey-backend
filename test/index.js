var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');

var should = chai.should();
chai.use(chaiHttp);

describe('Root', function() {
  it('GET should return API works', function(done) {
    chai.request(server)
    .get('/api')
    .end(function(err, res){
      res.should.have.status(200);
      res.text.should.equal('API works.');
      done();
    });
  });

  it('GET should throw for other routes', function(done) {
    chai.request(server)
    .get('/api/other')
    .end(function(err, res){
      res.should.have.status(404);
      done();
    });
  });

});