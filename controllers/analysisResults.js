const AnalysisResult = require('../models/analysisResult');
const TypingProfile = require('../models/typingProfile');
const User = require('../models/user');
const util = require('../services/util');
const Q = require('q');

exports.getAll = function(req, res) {
	let typingProfileId = req.query.typingProfile;
	let start = req.query.start;
	let end = req.query.end;

	TypingProfile.findById(typingProfileId, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));

		User.findById(typingProfile.user, (err, user) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			if (!user || String(user.organization) != req.user.organization) {
				return res.status(404).send(util.norm.errors({ message: 'Typing Profile not found' }));
			}

			if (start && end) {
				AnalysisResult.find({typingProfile: typingProfile._id, timestamp: {$gt: start, $lt: end}}).sort({timestamp: 1}).exec((err, analysisResults) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					console.log(analysisResults);
					return res.send({ analysisResults });
				});
			} else {
				AnalysisResult.find({typingProfile: typingProfile._id}, (err, analysisResults) => {
					if (err) return res.status(500).send(util.norm.errors(err));
					return res.send({ analysisResults });
				});
			}
		});
	});
}

exports.get = function(req, res) {
	/*// TODO: only get analysisResults from your organization
	analysisResult.findById(req.params.id, (err, analysisResult) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!analysisResult) return res.status(404).send(util.norm.errors({ message: 'Analysis result not found' }));
		return res.send({ analysisResult });
	});*/

	// Why would we ever get a single analysisResult?!
	res.sendStatus(405);
}

exports.post = function(req, res) {
	// Get the analysisResults array, keeping in mind that req may only have one analysisResult not in array form.
	var analysisResults = req.body.analysisResults || [req.body.analysisResult];
	if (analysisResults.length == 0 || !analysisResults[0]) return res.status(404).send(util.norm.errors({ message: 'No analysis results found' }));

	// Try to find the TypingProfile
	TypingProfile.findOne({ _id: analysisResults[0].typingProfile, user: req.user._id }, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
		
		// Save each of the analysis results
		for (var i = 0; i < analysisResults.length; i++) {
			var analysisResult = new AnalysisResult(analysisResults[i]);
			if (!analysisResult || !analysisResults[i]) return res.status(404).send(util.norm.errors({ message: 'Invalid analysis results found' }));
			analysisResult.save();
		}

		return res.sendStatus(200);
	});
}

exports.update = function(req, res) {
	/*// TODO: only update analysisResults from your organization
	var updatedAnalysisResult = req.body.analysisResult;
	
	TypingProfile.findOne({ _id: updatedAnalysisResult.typingProfile }, (err, typingProfile) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!typingProfile) return res.status(404).send(util.norm.errors({ message: 'TypingProfile not found' }));
		// Update the activity
		AnalysisResult.findByIdAndUpdate(req.params.id, updatedAnalysisResult, { new: true }, (err, analysisResult) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			res.send({ analysisResult });
		});
	});*/

	// Why would we ever change a analysisResult?!
	res.sendStatus(405);
}

exports.delete = function(req, res) {
	/*// TODO: only delete analysisResults from your organization
	AnalysisResult.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});*/

	// Don't need delete of analysisResults for now.
	res.sendStatus(405);
}