var express = require('express');
var router = express.Router();
var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');
var Machine = require('../models/machine');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.typingProfile);
        var typingProfile = new TypingProfile(req.body.typingProfile);

        //Try to find the user
        User.findById(typingProfile.user, (err, user) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!user) return res.status(404).send({errors: [{errmsg: 'User not found'}]});
            //Try to find the machine
            Machine.findById(typingProfile.machine, (err, machine) => {
                if (err) return res.status(500).send({errors: [err]});
                if (!machine) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
                //Save typingProfile
                typingProfile.save(err => {
                    if(err) return res.status(500).send({errors: [err]});
                    return res.json({typingProfile: typingProfile});
                });
            })
        });
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        TypingProfile.find((err, typingProfiles) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({typingProfiles: typingProfiles});
        });
    });

router.route('/:typingProfile_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        TypingProfile.findById(req.params.typingProfile_id, (err, typingProfile) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
            return res.json({typingProfile: typingProfile});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
        TypingProfile.findById(req.params.typingProfile_id, (err, typingProfile) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});

            typingProfile.user = req.body.typingProfile.user;
            typingProfile.machine = req.body.typingProfile.machine;
            typingProfile.authStatus = req.body.typingProfile.authStatus;
            typingProfile.lockStatus = req.body.typingProfile.lockStatus;
            typingProfile.accessToken = req.body.typingProfile.accessToken;
            typingProfile.tensorFlowModel = req.body.typingProfile.tensorFlowModel;

            //Try to find the user
            User.findById(typingProfile.user, (err, user) => {
                if (err) return res.status(500).send({errors: [err]});
                if (!user) return res.status(404).send({errors: [{errmsg: 'User not found'}]});
                //Try to find the machine
                    Machine.findById(typingProfile.machine, (err, machine) => {
                    if (err) return res.status(500).send({errors: [err]});
                    if (!machine) return res.status(404).send({errors: [{errmsg: 'Machine not found'}]});
                    //Save typingProfile
                    typingProfile.save(err => {
                        if(err) return res.status(500).send({errors: [err]});
                        return res.json({updated: typingProfile});
                    });
                });
            });
        });
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        TypingProfile.findByIdAndRemove(req.params.typingProfile_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
            deleted.remove();
            return res.json({deleted: deleted});
        });
    });

module.exports = router;