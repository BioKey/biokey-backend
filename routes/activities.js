var express = require('express');
var router = express.Router();
var TypingProfile = require('../models/typingProfile');
var Activity = require('../models/activity');
var ActivityType = require('../models/activityType');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.activity);
        var activity = new Activity(req.body.activity);

        //Try to find the ActivityType
        ActivityType.findById(activity.activityType, (err, activityType) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
            //Try to find the TypingProfile
            TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
                if (err) return res.status(500).send({errors: [err]});
                if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
                //Save Activity
                activity.save(err => {
                    if(err) return res.status(500).send({errors: [err]});
                    return res.json({activity: activity});
                });
            })
        });
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        Activity.find((err, activities) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({activities: activities});
        });
    });

router.route('/:activity_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        Activity.findById(req.params.activity_id, (err, activity) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!activity) return res.status(404).send({errors: [{errmsg: 'Activity not found'}]});
            return res.json({activity: activity});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
        Activity.findById(req.params.activity_id, (err, activity) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!activity) return res.status(404).send({errors: [{errmsg: 'Activity not found'}]});

            activity.activityType = req.body.activity.activityType;
            activity.typingProfile = req.body.activity.typingProfile;
            activity.timestamp = req.body.activity.timestamp;

            //Try to find the ActivityType
            ActivityType.findById(activity.activityType, (err, activityType) => {
                if (err) return res.status(500).send({errors: [err]});
                if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
                //Try to find the TypingProfile
                TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
                    if (err) return res.status(500).send({errors: [err]});
                    if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
                    //Save Activity
                    activity.save(err => {
                        if(err) return res.status(500).send({errors: [err]});
                        return res.json({activity: activity});
                    });
                });
            });
        });
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        Activity.findByIdAndRemove(req.params.activity_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'Activity not found'}]});
            deleted.remove();
            return res.json({});
        });
    });

module.exports = router;