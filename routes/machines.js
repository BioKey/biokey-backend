var express = require('express');
var router = express.Router();
var Machine = require('../models/machine');
var Organization = require('../models/organization');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.machine);
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
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        Machine.find((err, machines) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({machines: machines});
        });
    });

router.route('/:machine_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        Machine.findById(req.params.machine_id, (err, machine) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!machine) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
            return res.json({machine: machine});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
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
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        Machine.findByIdAndRemove(req.params.machine_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
            deleted.remove();
            return res.json({deleted: deleted});
        });
    });

module.exports = router;