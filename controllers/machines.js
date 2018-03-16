const Machine = require('../models/machine');
const User = require('../models/user');
const Organization = require('../models/organization');
const util = require('../services/util');

exports.getAll = function(req, res) {
	Machine.find({'organization' : req.user.organization}, (err, machines) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		res.send({ machines });
	});
}

exports.get = function(req, res) {
	Machine.findById(req.params.id, (err, machine) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!machine || String(machine.organization) != req.user.organization) {
			return res.status(404).send(util.norm.errors({ message: 'Machine not found' }));
		}
		res.send({ machine });
	});
}

exports.post = function(req, res) {
	var machine = new Machine(req.body.machine);

	// Assign current user's organization if null
	machine.organization = machine.organization || req.user.organization;

	// TODO: Verify data before inserting
	if (String(machine.organization) != req.user.organization) {
		return res.status(404).send(util.norm.errors({ message: 'Cannot create machine outside of organization' }));
	}

	// Try to find the organization
	Organization.findById(machine.organization, (err, organization) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!organization) return res.status(404).send(util.norm.errors({ message: 'Organization not found' }));
		// Save machine
		machine.save(err => {
			if (err) return res.status(500).send(util.norm.errors(err));
			res.send({ machine });
		});
	});
}

exports.update = function(req, res) {
	let updatedMachine = req.body.machine;

	// TODO: Verify changes before updating
	if (updatedMachine.organization != req.user.organization) {
		return res.status(404).send(util.norm.errors({ message: 'Cannot update machine outside of organization' }));
	}

	// Try to find the organization
	Organization.findById(updatedMachine.organization, (err, organization) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!organization) return res.status(404).send(util.norm.errors({ message: 'Organization not found' }));
		// Save machine
		Machine.findByIdAndUpdate(req.params.id, updatedMachine, { new: true }, (err, machine) => {
			if (err) return res.status(500).send(util.norm.errors(err));
			res.send({ machine });
		});
	});
}

exports.delete = function(req, res) {
	Machine.findById(req.params.id, (err, machine) => {
		if (err) return res.status(500).send(util.norm.errors(err));
		if (!machine || String(machine.organization) != req.user.organization) {
			return res.status(500).send(util.norm.errors({ message: 'Cannot delete machine outside of organization' }));
		}
		
		machine.remove();
		res.sendStatus(200);
	});	
}