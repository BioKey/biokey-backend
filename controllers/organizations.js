var Organization = require('../models/organization');

exports.getAll = function (req, res) {
    Organization.find((err, organizations) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json(organizations);
    });
}

exports.get = function (req, res) {
    Organization.findById(req.params.organization_id, (err, organization) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!organization) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
        return res.json({organization: organization});
    });
}

exports.post = function (req, res) {
    var organization = new Organization(req.body.organization);
    organization.save(err => {
        if(err) return res.status(500).send({errors: [err]});
        return res.json({organization: organization});
    });
}

exports.update = function (req, res) {
    Organization.findById(req.params.organization_id, (err, organization) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!organization) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});

        organization.name = req.body.organization.name;
        organization.maxUsers = req.body.organization.maxUsers;
        organization.challengeStrategies = req.body.organization.challengeStrategies;
        organization.defaultThreshold = req.body.organization.defaultThreshold;

        organization.save(err => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({updated: organization});
        })

    });
}

exports.delete = function (req, res) {
    Organization.findByIdAndRemove(req.params.organization_id, (err, deleted) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!deleted) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
        deleted.remove();
        return res.json({});
    });
}