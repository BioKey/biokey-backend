const ActivityType = require('../models/activityType');
const util = require('../services/util');

exports.getAll = function (req, res) {
	ActivityType.find((err, activityTypes) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		return res.send({ activityTypes });
	});
}

exports.get = function (req, res) {
	ActivityType.findById(req.params.id, (err, activityType) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!activityType) return res.status(404).send(util.norm.errors({message: 'ActivityType not found'}));
		return res.send({ activityType });
	});
}

exports.post = function (req, res) {
	var activityType = new ActivityType(req.body.activityType);
	activityType.save(err => {
		if(err) return res.status(500).send(util.norm.errors(err));
		return res.send({ activityType });
	});
}

exports.update = function (req, res) {
  let updatedActivityType = req.body.activityType; 

  // TODO: Verify changes before updating
  
  ActivityType.findByIdAndUpdate(req.params.id, updatedActivityType, {new: true}, (err, activityType) => {
    if (err) return res.status(500).send(util.norm.errors(err));
    res.send({ activityType });
  });
}

exports.delete = function (req, res) {
	ActivityType.findByIdAndRemove(req.params.id, err => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.sendStatus(200);
	});
}