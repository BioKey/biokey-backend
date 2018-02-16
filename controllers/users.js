const User = require('../models/user');
const util = require('../services/util');

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

	User.findByIdAndUpdate(req.params.id, updatedUser, { new: true }, (err, user) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ user });
	});
}

exports.delete = function(req, res) {
	User.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});
}