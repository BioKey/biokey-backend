const User = require('../models/user');
const TypingProfile = require('../models/typingProfile');
const util = require('../services/util');
var mongoose = require('mongoose');

exports.me = function(req, res) {
	res.send({ user: req.user });
}

exports.getAll = function(req, res) {
	// Allow the client to query users' by organization
	let query = util.filter.query(req.query, ['organization']);
	User.find(query, (err, users) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ users });
	});
}

exports.get = function(req, res) {
	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({ message: 'User not found' }));
		res.send({ user });
	});
}

exports.post = function(req, res) {
	let user = new User(req.body.user);

	// TODO: Verify data before inserting

	// Assign current user's organization if null
	user.organization = user.organization || req.user.organization;

	user.save(err => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ user });
	});
}

exports.update = function(req, res) {
	let updatedUser = req.body.user;

	// TODO: Verify changes before updating

	User.findById(req.params.id, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({ message: 'User not found' }));

		// Determine how to handle the message
		let origin = util.checkOrigin(req.user, user._id);
		if (origin == 'INVALID') return res.status(401).send(util.norm.errors({ message: 'Invalid Permissions' }));

		// Get the user's typing profiles to save activities.
		TypingProfile.find({"user": user._id}, function (err, typingProfiles) {
			if (err) return res.status(500).send(util.norm.errors(err));

			let oldUser = JSON.parse(JSON.stringify(user));
			if (updatedUser.name) user.name = updatedUser.name;
			if (updatedUser.email) user.email = updatedUser.email;
			if (updatedUser.isAdmin) user.isAdmin = updatedUser.isAdmin;
			if (updatedUser.phoneNumber) user.phoneNumber = updatedUser.phoneNumber;
			if (updatedUser.organization) user.organization = updatedUser.organization;

			user.save((err, saved) => {
				if (err) return res.status(500).send(util.norm.errors(err));

				// Save activities for each typingProfile, alert the relevant party.
				if (typingProfiles) {
					typingProfiles.forEach(profile => {
						util.send.activity.user(origin, oldUser, updatedUser, profile, false);
					});
				}

				res.send({ user });
			});
		});
	});
}

exports.delete = function(req, res) {
	User.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});
}