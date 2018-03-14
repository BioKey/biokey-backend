const User = require('../models/user');
const Organization = require('../models/organization');
const util = require('../services/util');

exports.login = function(req, res) {
  // user has already had thier email and password auth'd
  // we just need to give them a token
  // req.user is assigned by passport done function
  res.send({ token: req.user.getToken() });
}

exports.register = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;
  let isAdmin = req.body.isAdmin;
  let organization = req.body.organization;
  let phoneNumber = req.body.phoneNumber;

  if (!email || !password || !name) {
    return res.status(422).send(util.norm.errors({ message: 'email, password, and name are required' }));
  }

  // see if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) return res.status(500).send(util.norm.errors(err));
    // if a user with email does exist, return an error
    if (existingUser) return res.status(422).send(util.norm.errors({ message: 'Email is in use' }));

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

      user.save(function(err) {
        if (err) return res.status(500).send(util.norm.errors(err));
        util.send.adminAlert(organization, "New user with email: " + email + " joined user organization.");
        return res.send({ token: user.getToken() });
      });
    };

    Organization.findById(organization, function(err, org) {
      if (err) return res.status(500).send(util.norm.errors(err));
      if (!org) {
        // Create org for new user
        const newOrg = new Organization({ name: `${name}'s Organization` });
        newOrg.save(err => {
          if (err) return res.status(500).send(util.norm.errors(err));
          organization = newOrg._id;
          isAdmin = true;
          createUser();
        })
      } else {
        isAdmin = false;
        createUser();
      }
    });
  });

}