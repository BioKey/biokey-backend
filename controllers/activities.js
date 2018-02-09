const Activity = require('../models/activity');
const ActivityType = require('../models/activityType');
const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const util = require('../services/util');

exports.getAll = function (req, res) {
	Activity.find((err, activities) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ activities });
	});
}

exports.get = function (req, res) {
	Activity.findById(req.params.id, (err, activity) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activity) return res.status(404).send(util.norm.errors({message: 'No activity was found.'}));
		res.send({ activity });
	});
}

exports.post = function (req, res) {
	var activity = new Activity(req.body.activity);
	//Try to find the ActivityType
	ActivityType.findById(activity.activityType, (err, activityType) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activityType) return res.status(404).send(util.norm.errors({message: 'ActivityType not found'}));
		// Try to find the TypingProfile
		// Query for activity typing profile and user_id if not admin
		let query = { _id: activity.typingProfile, };
		if (!req.user.isAdmin) query.user = req.user._id;
		TypingProfile.findOne(query, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({message: 'TypingProfile not found'}));
			activity.save(err => {
				if(err) return res.status(500).send(util.norm.errors(err));
				return res.json({ activity });
			});
		});
	});
}

// TODO: Should this be able to change?
exports.update = function (req, res) {
	var updatedActivity = req.body.activity;
	//Try to find the ActivityType
	ActivityType.findById(updatedActivity.activityType, (err, activityType) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activityType) return res.status(404).send(util.norm.errors({message: 'ActivityType not found'}));
		// Try to find the TypingProfile
		// Query for activity typing profile and user_id if not admin
		let query = { _id: activity.typingProfile };
		if (!req.user.isAdmin) query.user = req.user._id;
		TypingProfile.findOne(query, (err, typingProfile) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!typingProfile) return res.status(404).send(util.norm.errors({message: 'TypingProfile not found'}));
			// Update the activity
			Activity.findByIdAndUpdate(req.params.id, updatedActivity, {new: true}, (err, activity) => {
				if (err) return res.status(500).send(util.norm.errors(err));
				res.send({ activity });
			});
		});
	});
}

exports.delete = function (req, res) {
	Activity.findByIdAndRemove(req.params.id, (err, deleted) =>{
		if (err) return res.status(500).send(util.norm.errors(err));
		if(!deleted) return res.status(404).send(util.norm.errors({message: 'Record not found'}))
		res.sendStatus(200);
	});
}