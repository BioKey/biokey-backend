const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const UserControllor = require('../controllers/users');
const Machine = require('../models/machine');
const Organization = require('../models/organization');
const util = require('../services/util');
let testModel = require('../ensemble-c-2.json');
testModel.model = JSON.stringify(testModel.model)
testModel.weights = JSON.stringify(testModel.weights)

exports.getAll = function(req, res) {
	let limit = parseInt(req.query.limit);
	let page = parseInt(req.query.page);
	let sort = req.query.sort || '-lastHeartbeat';
	let query = util.filter.query(req.query, ['user', 'machine']);
	
	// If a user was specified, make sure they are in the same organization.
	if (query.user) {
		User.findById(query.user, (err, user) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!user || String(user.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'User not found' }));
			}

			// Get all the typing profiles for that user.
			if (limit && page) {
				TypingProfile.paginate(query, {page: page, limit: limit, sort: sort}, (err, typingProfiles) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					res.send({ typingProfiles: typingProfiles.docs, meta: {pages: typingProfiles.pages} });
				});
			} else {
				TypingProfile.find(query, (err, typingProfiles) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					res.send({ typingProfiles });
				});
			}
		});
	} else {
		// If no user was specified, find all the users in the organization.
		User.find({'organization' : req.user.organization}, {_id: 1}, (err, users) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			
			// Add all the users to the query
			let ids = users.map(function(doc) { return doc._id});
			query.user = {$in: ids};

			// Get all the typing profiles for that user.
			if (limit && page) {
				TypingProfile.paginate(query, {page: page, limit: limit}, (err, typingProfiles) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					res.send({ typingProfiles: typingProfiles.docs, meta: {pages: typingProfiles.pages} });
				});
			} else {
				TypingProfile.find(query, (err, typingProfiles) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					res.send({ typingProfiles });
				});
			}
		});
	}
}

exports.get = function(req, res) {
	let query = { _id: req.params.id };
	if (!req.user.isAdmin) query.user = req.user._id;

	TypingProfile.findOne(query, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));

		// Make sure that the typing profile of the user is accessible by the request user
		User.findById(typingProfile.user, (err, user) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!user || String(user.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));
			}

			res.send({ typingProfile });
		});
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
				tensorFlowModel: testModel,
				challengeStrategies: organization.defaultChallengeStrategies
			});
			newTypingProfile.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				util.send.activity.typingProfile("CLIENT", {}, newTypingProfile, user);
				res.send({ typingProfile: newTypingProfile, phoneNumber: user.phoneNumber, googleAuthKey: user.googleAuthKey, timeStamp: Date.now() });
			})
		});
	}

	// Find machine by mac
	Machine.findOne({ mac: req.params.mac }, (err, machine) => {
		if (err) return res.status(500).send(util.norm.errors(err));

		if (machine) {
			if (String(machine.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));
			}
			// Find typing profile with user, machine pair
			TypingProfile.findOne({ user: req.user._id, machine: machine._id }).select('+tensorFlowModel').exec(function(err, typingProfile) {
				if (err) return res.status(500).send(util.norm.errors(err));
				
				if (typingProfile) {
					res.send({ typingProfile: typingProfile, phoneNumber: req.user.phoneNumber, googleAuthKey: req.user.googleAuthKey, timeStamp: Date.now() });
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
		if (String(typingProfile.user) != req.user._id) {
			return res.status(404).send(util.norm.errors({ message: 'Cannot heartbeat another user' }));
		}

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
	if (util.checkOrigin(req.user, typingProfile.user) == 'INVALID') return res.status(401).send(util.norm.errors({ message: 'Invalid Permissions' }));

	// TODO: Validate before insert

	// Assert valid user
	User.findById(typingProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user || String(user.organization) != req.user.organization) {
			return res.status(404).send(util.norm.errors({ message: 'User not found' }));
		}
		
		// Assert valid machine
		Machine.findById(typingProfile.machine, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!machine) return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));
			
			// Save typing profiles
			typingProfile.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				util.send.activity.typingProfile("CLIENT", {}, typingProfile, user);
				res.send({ typingProfile });
			});
		})
	});
}

exports.update = function(req, res) {
	let updatedProfile = req.body.typingProfile;

	// Determine how to handle the message.
	let origin = util.checkOrigin(req.user, req.body.typingProfile.user);
	if (origin == 'INVALID') return res.status(401).send(util.norm.errors({ message: 'Invalid Permissions' }));
	
	// TODO: Verify changes before updating

	// Assert valid user.
	User.findById(updatedProfile.user, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!user || String(user.organization) != req.user.organization) {
			return res.status(404).send(util.norm.errors({ message: 'User not found' }));
		}

		// Assert valid machine.
		Machine.findById(updatedProfile.machine, (err2, machine) => {
			if (err2) return res.status(500).send(util.norm.errors(err2));
			if (!machine) return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));

			// Find and save typing profile.
			TypingProfile.findById(req.params.id, (err3, typingProfile) => {
				if (err3) return res.status(500).send(util.norm.errors(err3));
				if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));

				let oldProfile = JSON.parse(JSON.stringify(typingProfile));
				if (updatedProfile.user) typingProfile.user = updatedProfile.user;
				if (updatedProfile.machine) typingProfile.machine = updatedProfile.machine;
				if (updatedProfile.hasOwnProperty('isLocked')) typingProfile.isLocked = updatedProfile.isLocked;
				if (updatedProfile.lastHeartbeat) typingProfile.lastHeartbeat = updatedProfile.lastHeartbeat;
				if (updatedProfile.tensorFlowModel) typingProfile.tensorFlowModel = updatedProfile.tensorFlowModel;
				if (updatedProfile.challengeStrategies) typingProfile.challengeStrategies = updatedProfile.challengeStrategies;
				if (updatedProfile.threshold) typingProfile.threshold = updatedProfile.threshold;
				if (updatedProfile.endpoint) typingProfile.endpoint = updatedProfile.endpoint;

				typingProfile.save((err4, saved) => {
					if (err4) return res.status(500).send(util.norm.errors(err4));
					
					// Strip the model from saved because it is too big to send.
					if (saved.tensorFlowModel) saved.tensorFlowModel = null;
					// Save activity, alert the relevant party.
					util.send.activity.typingProfile(origin, oldProfile, saved, user);

					// Check if user fields related to typing profile has been updated.
					if (req.body.phoneNumber || req.body.googleAuthKey) {
						let oldUser = JSON.parse(JSON.stringify(user));
						if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
						if (req.body.googleAuthKey) user.googleAuthKey = req.body.googleAuthKey;

						user.save((err5, savedUser) => {
							if (err5) return res.status(500).send(util.norm.errors(err5));

							// Save activities for each typingProfile, alert the relevant party.
							TypingProfile.find({"user": user._id}, (err6, typingProfiles) => {
								if (err6) return res.status(500).send(util.norm.errors(err));
								if (typingProfiles) {
									typingProfiles.forEach(profile => {
										util.send.activity.user(origin, oldUser, savedUser, profile, false);
									});
								}
								res.send({ typingProfile: saved });
							});
						});
					} else res.send({ typingProfile: saved });
				});
			});
		});
	});
}

exports.delete = function(req, res) {
	TypingProfile.findById(req.params.id, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));

		// Make sure that the typing profile of the user is accessible by the request user
		User.findById(typingProfile.user, (err, user) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!user || String(user.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));
			}

			typingProfile.remove();
			res.sendStatus(200);
		});
	});
}