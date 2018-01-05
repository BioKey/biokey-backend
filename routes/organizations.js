var express = require('express');
var router = express.Router();
var Organization = require('../models/organization');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.organization);
        var organization = new Organization(req.body.organization);
        organization.save(err => {
            if(err) return res.status(500).send({errors: [err]});
            return res.json({organization: organization});
        })
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        Organization.find((err, organizations) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({organizations: organizations});
        });
    });

router.route('/:organization_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        Organization.findById(req.params.organization_id, (err, organization) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!organization) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
            return res.json({organization: organization});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
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
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        Organization.findByIdAndRemove(req.params.organization_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'Organization not found'}]});
            deleted.remove();
            return res.json({});
        });
    });

module.exports = router;