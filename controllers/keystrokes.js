const Keystroke = require('../models/keystroke');
const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const util = require('../services/util');
const Q = require('q');

exports.getAll = function(req, res) {
	/*// TODO: only get keystrokes from your organization
	Keystroke.find((err, keystrokes) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		return res.send({ keystrokes });
	});*/

	// Don't need get of keystrokes for now.
	res.sendStatus(405);
}

exports.get = function(req, res) {
	/*// TODO: only get keystrokes from your organization
	Keystroke.findById(req.params.id, (err, keystroke) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!keystroke) return res.status(404).send(util.norm.errors({ message: 'Keystroke not found' }));
		return res.send({ keystroke });
	});*/

	// Don't need get of keystrokes for now.
	res.sendStatus(405);
}

exports.post = function(req, res) {
	// Get the keystrokes array, keeping in mind that req may only have one keystroke not in array form.
	var keystrokesRaw = req.body.keystrokes || [req.body.keystroke];
	if (keystrokesRaw.length == 0 || !keystrokesRaw[0]) return res.status(404).send(util.norm.errors({ message: 'No keystrokes found' }));

	// Try to find the TypingProfile
	// Query for activity typing profile and user_id if not admin
	let query = { _id: keystrokesRaw[0].typingProfile };
	if (!req.user.isAdmin) query.user = req.user._id;
	TypingProfile.findOne(query, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
		if (String(typingProfile.user) != req.user._id) {
			return res.status(404).send(util.norm.errors({ message: 'Cannot add keystrokes for someone else' }));
		}
		
		// Validate all keystrokes
		var validatePromises = [];
		var keystrokes = [];
		for (var i = 0; i < keystrokesRaw.length; i++) {
			var keystroke = new Keystroke(keystrokesRaw[i]);
			if (!keystroke || !keystrokesRaw[i]) return res.status(404).send(util.norm.errors({ message: 'Invalid keystrokes found' }));

			validatePromises.push(keystroke.validate());
			keystrokes.push(keystroke);
		}

		// Wait for all validations to complete
		Q.all(validatePromises).then(results => {
			// Save all keystrokes
			var savePromises = [];
			for (var i = 0; i < keystrokes.length; i++) {
				var keystroke = new Keystroke(keystrokes[i]);
				savePromises.push(keystroke.save());
			}

			// Wait for all saves to complete
			Q.all(savePromises).then(results => {
				return res.send({ keystrokes: keystrokes });
			}, err => {
				return res.status(500).send(util.norm.errors(err));
			})
		}, err => {
			return res.status(500).send(util.norm.errors(err));
		});
	});
}

exports.update = function(req, res) {
	/*// TODO: only update keystrokes from your organization
	var updatedKeystroke = req.body.keystroke;
	
	TypingProfile.findOne({ _id: updatedKeystroke.typingProfile }, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
		// Update the activity
		Keystroke.findByIdAndUpdate(req.params.id, updatedKeystroke, { new: true }, (err, keystroke) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			res.send({ keystroke });
		});
	});*/

	// Why would we ever change a keystroke?!
	res.sendStatus(405);
}

exports.delete = function(req, res) {
	/*// TODO: only delete keystrokes from your organization
	Keystroke.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});*/

	// Don't need delete of keystrokes for now.
	res.sendStatus(405);
}