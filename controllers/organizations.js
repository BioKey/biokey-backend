const Organization = require('../models/organization');
const util = require('../services/util');

exports.getAll = function(req, res) {
	// Effectively the same as get because no one should be able to get all organizations
	Organization.findById(req.user.organization, (err, organization) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ organization });
	});
}

exports.get = function(req, res) {
	if (req.user.organization != req.params.id) {
		return res.status(404).send(util.norm.errors({ message: 'Organization not found' }));
	}

	Organization.findById(req.params.id, (err, organization) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!organization) return res.status(404).send(util.norm.errors({ message: 'Organization not found' }));
		res.send({ organization });
	});
}

exports.post = function(req, res) {
	/*var organization = new Organization(req.body.organization);

	// TODO: Validate organization

	organization.save(err => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ organization });
	});*/

	// Why would we ever post an organization?! They are created with their founding user.
	res.sendStatus(405);
}

exports.update = function(req, res) {
	let updatedOrganization = req.body.organization;

	// TODO: Verify changes before updating
	if (req.user.organization != req.params.id) {
		return res.status(404).send(util.norm.errors({ message: 'Cannot update another organization' }));
	}

	Organization.findByIdAndUpdate(req.params.id, updatedOrganization, { new: true }, (err, organization) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ organization });
	});
}

exports.delete = function(req, res) {
	if (req.user.organization != req.params.id) {
		return res.status(404).send(util.norm.errors({ message: 'Cannot delete another organization' }));
	}

	Organization.findByIdAndRemove(req.params.id, (err, deleted) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!deleted) return res.status(404).send(util.norm.errors({ message: 'Record not found' }))
		res.sendStatus(200);
	});
}