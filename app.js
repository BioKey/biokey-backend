const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

//DB setup
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.get('env')], { useMongoClient: true })
.then(db => {
  return console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
})
.catch(err => {
  console.error('Error connecting to the database. ' + err);
});

// App setup
if(app.get('env') !== 'test') app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.get('/', function(req, res) {
  res.send('Hello world');
});

// Routes setup
var auth = require('./routes/auth');
app.use('/api/auth', auth);

var users = require('./routes/users');
app.use('/api/users', users);

var activities = require('./routes/activities');
app.use('/api/activities', activities);

var activityTypes = require('./routes/activityTypes');
app.use('/api/activityTypes', activityTypes);

var keystrokes = require('./routes/keystrokes');
app.use('/api/keystrokes', keystrokes);

var machines = require('./routes/machines');
app.use('/api/machines', machines);

var organizations = require('./routes/organizations');
app.use('/api/organizations', organizations);

var typingProfiles = require('./routes/typingProfiles');
app.use('/api/typingProfiles', typingProfiles);

module.exports = app;
