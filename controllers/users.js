const User = require('../models/user');
const Util = require('../services/util');

exports.me = function(req, res, next){
  res.status(200).send({user: req.user});
}

// RETURNS ALL THE USERS IN THE DATABASE
exports.getAll = function (req, res) {
  let query = {};
  // Allow the client to query the list
  if(req.query.organization) query.organization = req.query.organization

    User.find(query, function (err, users) {
      if (err) return res.status(500).send("There was a problem finding the users.");
      res.status(200).send({users: users});
    });
}

// GETS A SINGLE USER FROM THE DATABASE
exports.get = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send({user: user});
  });
}

exports.post = function (req, res) {
  var user = new User(req.body.user);
  user.organization = req.user.organization;
  user.save(err => {
    if(err) return res.status(500).send(Util.normalize.errors(err));
    return res.json({ user });
  });
}

// DELETES A USER FROM THE DATABASE
exports.delete = function (req, res) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User: "+ user.name +" was deleted.");
  });
}

// UPDATES A SINGLE USER IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated user can put to this route
exports.update = function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body.user, {new: true}, function (err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send({user: user});
  });
}