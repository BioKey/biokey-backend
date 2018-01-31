const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.login = function(req, res, next){
  // user has already had thier email and password auth'd
  // we just need to give them a token
  // req.user is assigned by passport done function
  res.send({token: tokenForUser(req.user), user: req.user});
}

exports.register = function(req, res, next){
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const isAdmin = req.body.isAdmin;
  const organization = req.body.organization;

  if(!email || !password || !name){
    res.status(422).send({error: 'email, password, and name is required'});
  }

  // see if a user with the given email exists
  User.findOne({email: email}, function(err, existingUser){
    if(err) { return next(err); }

    // if a user with email does exist, return an error
    if(existingUser){
      return res.status(422).send({error: 'Email is in use'});
    }

    // if a user with does not exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      name: name,
      isAdmin: isAdmin,
      organization: organization
    });

    user.save(function(err){
      if(err) { return next(err); }

      res.json({token: tokenForUser(user), user: user});
    });

  });

}

exports.me = function(req, res, next){
  res.status(200).send(req.user);
}