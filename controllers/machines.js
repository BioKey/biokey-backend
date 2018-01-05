var Machine = require('../models/machine');
var Organization = require('../models/organization');

exports.getAll = function (req, res) {
    Machine.find((err, machines) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json({machines: machines});
    });
}

exports.get = function (req, res) {
    Machine.findById(req.params.machine_id, (err, machine) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!machine) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
        return res.json({machine: machine});
    });
}

exports.post = function (req, res) {
    var machine = new Machine(req.body.machine);
    //Try to find the organization
    Organization.findById(machine.organization, (err, organization) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!organization) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
        //Save machine
        machine.save(err => {
            if(err) return res.status(500).send({errors: [err]});
            return res.json({machine: machine});
        });
    });
}

exports.update = function (req, res) {
    Machine.findById(req.params.machine_id, (err, machine) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!machine) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});

        machine.mac = req.body.machine.mac;
        machine.organization = req.body.machine.organization;

        //Try to find the organization
        Organization.findById(machine.organization, (err, organization) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!organization) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
            //Save machine
            machine.save(err => {
                if (err) return res.status(500).send({errors: [err]});
                return res.json({updated: machine});
            });
        });
    });
}

exports.delete = function (req, res) {
    Machine.findByIdAndRemove(req.params.machine_id, (err, deleted) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!deleted) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
        deleted.remove();
        return res.json({deleted: deleted});
    });
}