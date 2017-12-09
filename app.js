var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// *** config file *** //
var config = require('./config');

// *** mongoose *** //
 mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI[app.get('env')], { useMongoClient: true })
.then(res => {
  return console.log('Connected to Database: ' + config.mongoURI[app.settings.env]);
})
.catch(err => {
  console.log('Error connecting to the database. ' + err);
});

// *** express *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// *** routes *** //
app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var auth = require('./routes/auth');
app.use('/api/auth', auth);

var users = require('./routes/users');
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    error: err
  });
});


module.exports = app;
