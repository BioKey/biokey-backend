const Activity = require('../models/activity');
const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const util = require('../services/util');

exports.getAll = function(req, res) {
	// Get all the users for the organization
	User.find({'organization' : req.user.organization}, {_id: 1}, (err, users) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		let ids = users.map(function(doc) { return doc._id});

		// Get all the typing profiles for the users
		TypingProfile.find({'user': {$in: ids}}, {_id: 1}, (err, typingProfiles) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			ids = typingProfiles.map(function(doc) { return doc._id});

			// Get all the activities for the typing profiles
			Activity.find({'typingProfile': {$in: ids}}, (err, activities) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.send({ activities });
			});
		});
	});
}

exports.get = function(req, res) {
	// Ensure that the user this activity belongs to belongs to the same organization as requester
	Activity.findById(req.params.id, (err, activity) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activity) return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));

		TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));

			User.findById(typingProfile.user, (err, user) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				if (!user || String(user.organization) != req.user._id) {
					return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));
				}

				res.send({ activity });
			});
		});
	});
}

exports.post = function(req, res) {
	var activity = new Activity(req.body.activity);

	// Try to find the TypingProfile
	// Query for activity typing profile and user_id if not admin
	let query = { _id: activity.typingProfile, };
	if (!req.user.isAdmin) query.user = req.user._id;

	TypingProfile.findOne(query, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));

		User.findById(typingProfile.user, (err, user) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!user || String(user.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
			}
			
			activity.save(err => {
				if (err) return res.status(500).send(util.norm.errors(err));
				return res.json({ activity });
			});
		});
	});
}

exports.update = function(req, res) {
	/*// TODO: only update activities from your organization
	var updatedActivity = req.body.activity;
	
	TypingProfile.findOne({ _id: activity.typingProfile }, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
		// Update the activity
		Activity.findByIdAndUpdate(req.params.id, updatedActivity, { new: true }, (err, activity) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			res.send({ activity });
		});
	});*/

	// Why would we ever change an activity?!
	res.sendStatus(405);
}

exports.delete = function(req, res) {
	// Ensure that the user this activity belongs to belongs to the same organization as requester
	Activity.findById(req.params.id, (err, activity) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activity) return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));

		TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));

			User.findById(typingProfile.user, (err, user) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				if (!user || String(user.organization) != req.user._id) {
					return res.status(404).send(util.norm.errors({ message: 'No activity was found.' }));
				}

				Activity.findByIdAndRemove(req.params.id, (err, deleted) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
					res.sendStatus(200);
				});
			});
		});
	});
}