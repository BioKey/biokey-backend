require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const mongoURI = process.env.MONGO_URI || config.mongoURI[app.get('env')];

// DB setup
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useMongoClient: true })
	.then(db => {
		return console.log('Connected to Database: ' + mongoURI);
	})
	.catch(err => {
		console.error('Error connecting to the database. ' + err);
	});

// App setup
app.use(helmet());
if (app.get('env') !== 'test') app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Routes setup
var auth = require('./routes/auth');
app.use('/api/auth', auth);

var users = require('./routes/users');
app.use('/api/users', users);

var activities = require('./routes/activities');
app.use('/api/activities', activities);

var keystrokes = require('./routes/keystrokes');
app.use('/api/keystrokes', keystrokes);

var machines = require('./routes/machines');
app.use('/api/machines', machines);

var organizations = require('./routes/organizations');
app.use('/api/organizations', organizations);

var typingProfiles = require('./routes/typingProfiles');
app.use('/api/typingProfiles', typingProfiles);

var analysisResults = require('./routes/analysisResults');
app.use('/api/analysisResults', analysisResults);

module.exports = app;