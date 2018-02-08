const User = require('../models/user');
const Organization = require('../models/organization');

exports.login = function(req, res, next){
  // user has already had thier email and password auth'd
  // we just need to give them a token
  // req.user is assigned by passport done function
  res.send({token: req.user.getToken()});
}

exports.register = function(req, res, next){
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  let isAdmin = false;
  let organization = req.body.organization;
  let phoneNumber = req.body.phoneNumber;

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

    // To be called after organization is set
    const createUser = () => {
      const user = new User({
        email: email,
        password: password,
        name: name,
        isAdmin: isAdmin,
        organization: organization,
        phoneNumber: phoneNumber
      });

      user.save(function(err){
        if(err) { return next(err); }
        return res.json({token: user.getToken()});
      });
    };

    Organization.findById(organization, function(err, org) {
      if(err) { return next(err); }
      if(!org) {
        // Create org for new user
        const newOrg = new Organization({ name: `${name}'s Organization`});
        newOrg.save(err => {
          if(err) { return next(err); }
          organization = newOrg._id;
          isAdmin = true;
          createUser();
        })
      }
      else {
        createUser();
      }
    });
  });

}