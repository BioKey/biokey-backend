var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

var server = require('../app');

var should = chai.should();
chai.use(chaiHttp);
