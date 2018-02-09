const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const Machine = require('../models/machine');
const util = require('../services/util');

exports.getAll = function (req, res) {
	let query = util.filter.query(req.query, ['user', 'machine']);
	TypingProfile.find(query, (err, typingProfiles) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ typingProfiles });
	});
}

exports.get = function (req, res) {
	// Query for requested paramater and user_id if not admin
	let query = { _id: req.params.id, };
	if (!req.user.isAdmin) query.user = req.user._id;

	TypingProfile.findOne(query, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({message: 'Typing Profile not found'}));
		res.send({ typingProfile });
	});
}

exports.getTypingProfileFromMachine = function (req, res) {
	// Find machine by mac
	Machine.findOne({mac: req.params.machine_mac}, (err, machine) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!machine) return res.status(404).send(util.norm.errors({message: 'Machine not found'}));
		// Find typing profile with user, machine pair
		TypingProfile.findOne({
			user: req.user._id, 
			machine: machine._id
		}, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({message: 'Typing Profile not found'}));
			res.send({ typingProfile });
		});
	})
}

exports.post = function (req, res) {
	var typingProfile = new TypingProfile(req.body.typingProfile);
	// Assert admin or self made post
	if(!req.user.isAdmin && req.user._id!=typingProfile.user) {
		return res.status(401).send(util.norm.errors({message: 'Invalid Permissions'}));
	}

	// TODO: Validate before insert

	// Assert valid user
	User.findById(typingProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({message: 'User not found'}));
		// Assert valid machine
		Machine.findById(typingProfile.machine, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!machine) return res.status(404).send(util.norm.errors({message: 'Machine not found'}));
			// Save typing profiles
			typingProfile.save(err => {
				if(err) return res.status(500).send(util.norm.errors(err));
				res.send({ typingProfile });
			});
		})
	});
}

exports.update = function (req, res) {
	let updatedProfile = req.body.typingProfile; 

	// TODO: Verify changes before updating
	
	// Assert valid user
	User.findById(updatedProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({message: 'User not found'}));
		// Assert valid machine
		Machine.findById(updatedProfile.machine, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!machine) return res.status(404).send(util.norm.errors({message: 'Machine not found'}));
			// Save typing profile
			TypingProfile.findByIdAndUpdate(req.params.id, updatedProfile, {new: true}, (err, typingProfile) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.send({ typingProfile });
			});
		})
	});
}

exports.delete = function (req, res) {
	TypingProfile.findByIdAndRemove(req.params.id, err => {
		if (err) return res.status(500).send({errors: [err]});
		res.sendStatus(200)
	});
}