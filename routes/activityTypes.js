var express = require('express');
var router = express.Router();
var ActivityType = require('../models/activityType');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.activityType);
        var activityType = new ActivityType(req.body.activityType);
        activityType.save(err => {
            if(err) return res.status(500).send({errors: [err]});
            return res.json({activityType: activityType});
        })
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        ActivityType.find((err, activityTypes) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({activityTypes: activityTypes});
        });
    });

router.route('/:activityType_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        ActivityType.findById(req.params.activityType_id, (err, activityType) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
            return res.json({activityType: activityType});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
        ActivityType.findById(req.params.activityType_id, (err, activityType) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});

            activityType.description = req.body.activityType.description;
            activityType.importance = req.body.activityType.importance;

            activityType.save(err => {
                if (err) return res.status(500).send({errors: [err]});
                return res.json({});
            })

        });
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        ActivityType.findByIdAndRemove(req.params.activityType_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
            deleted.remove();
            return res.json({});
        });
    });

module.exports = router;