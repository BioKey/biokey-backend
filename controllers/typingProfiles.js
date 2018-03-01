const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const Machine = require('../models/machine');
const Organization = require('../models/organization');
const util = require('../services/util');

exports.getAll = function(req, res) {
	let query = util.filter.query(req.query, ['user', 'machine']);
	TypingProfile.find(query, (err, typingProfiles) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ typingProfiles });
	});
}

exports.get = function(req, res) {
	// Query for requested paramater and user_id if not admin
	let query = { _id: req.params.id };
	if (!req.user.isAdmin) query.user = req.user._id;

	TypingProfile.findOne(query, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));
		res.send({ typingProfile });
	});
}

exports.postTypingProfileFromMachine = function(req, res) {
	var createNewTypingProfile = function(user, machine) {
		// Find organization to get the default challenge strategies and thresholds
		Organization.findById(user.organization, (err, organization) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!organization) return res.status(404).send(util.norm.errors({ message: 'Organization not found' }));

			// Create new typing profile and save
			newTypingProfile = new TypingProfile ({
				user: user._id,
				machine: machine._id,
				isLocked: false,
				tensorFlowModel: "",
				challengeStrategies: organization.defaultChallengeStrategies,
				threshold: organization.defaultThreshold
			});
			newTypingProfile.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.send({ typingProfile: newTypingProfile, phoneNumber: user.phoneNumber, googleAuthKey: user.googleAuthKey });
			})
		});
	}

	// Find machine by mac
	Machine.findOne({ mac: req.params.mac }, (err, machine) => {
		if (err) return res.status(500).send(util.norm.errors(err));

		if (machine) {
			// Find typing profile with user, machine pair
			TypingProfile.findOne({ user: req.user._id, machine: machine._id }, (err, typingProfile) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				if (typingProfile) {
					res.send({ typingProfile: typingProfile, phoneNumber: req.user.phoneNumber });
				} else {
					return createNewTypingProfile(req.user, machine);
				}
			});
		} else {
			// If machine was not found, then create machine and typing profile
			newMachine = new Machine({ mac: req.params.mac, organization: req.user.organization });
			newMachine.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				return createNewTypingProfile(req.user, newMachine);
			});
		}
	});
}

exports.heartbeat = function(req, res) {
	TypingProfile.findById(req.params.id, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));
			typingProfile.lastHeartbeat = Date.now();
			typingProfile.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.sendStatus(200);
			});
		});
}

exports.post = function(req, res) {
	var typingProfile = new TypingProfile(req.body.typingProfile);
	
	// Determine how to handle the message
	if (util.check(req.user, typingProfile.user) == 'INVALID') return res.status(401).send(util.norm.errors({ message: 'Invalid Permissions' }));

	// TODO: Validate before insert

	// Assert valid user
	User.findById(typingProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({ message: 'User not found' }));
		// Assert valid machine
		Machine.findById(typingProfile.machine, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!machine) return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));
			// Save typing profiles
			typingProfile.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.send({ typingProfile });
			});
		})
	});
}

exports.update = function(req, res) {
	let updatedProfile = req.body.typingProfile;
	
	// Determine how to handle the message
	let origin = util.check(req.user, req.body.typingProfile.user);
	if (origin == 'INVALID') return res.status(401).send(util.norm.errors({ message: 'Invalid Permissions' }));
	
	// TODO: Verify changes before updating

	// Assert valid user
	User.findById(updatedProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user) return res.status(404).send(util.norm.errors({ message: 'User not found' }));
		// Assert valid machine
		Machine.findById(updatedProfile.machine, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!machine) return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));
			// Save typing profile
			TypingProfile.findById(req.params.id, (err, typingProfile) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
				
				// Save activity, alert the relevant party
				util.send.activity.typingProfile(origin, typingProfile, updatedProfile, user)
			
				if (updatedProfile.user) typingProfile.user = updatedProfile.user;
				if (updatedProfile.machine) typingProfile.machine = updatedProfile.machine;
				if (updatedProfile.isLocked) typingProfile.isLocked = updatedProfile.isLocked;
				if (updatedProfile.lastHeartbeat) typingProfile.lastHeartbeat = updatedProfile.lastHeartbeat;
				if (updatedProfile.tensorFlowModel) typingProfile.tensorFlowModel = updatedProfile.tensorFlowModel;
				if (updatedProfile.challengeStrategies) typingProfile.challengeStrategies = updatedProfile.challengeStrategies;
				if (updatedProfile.threshold) typingProfile.threshold = updatedProfile.threshold;

				typingProfile.save((err, saved) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					res.send({ typingProfile: saved });
				});
			});
		})
	});
}

exports.delete = function(req, res) {
	TypingProfile.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});
}