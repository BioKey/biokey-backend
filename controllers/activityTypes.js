var ActivityType = require('../models/activityType');

exports.getAll = function (req, res) {
    ActivityType.find((err, activityTypes) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json({activityTypes: activityTypes});
    });
}

exports.get = function (req, res) {
    ActivityType.findById(req.params.activityType_id, (err, activityType) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
        return res.json({activityType: activityType});
    });
}

exports.post = function (req, res) {
    var activityType = new ActivityType(req.body.activityType);
    activityType.save(err => {
        if(err) return res.status(500).send({errors: [err]});
        return res.json({activityType: activityType});
    });
}

exports.update = function (req, res) {
    ActivityType.findById(req.params.activityType_id, (err, activityType) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!activityType) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});

        activityType.description = req.body.activityType.description;
        activityType.importance = req.body.activityType.importance;

        activityType.save(err => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({updated: activityType});
        });
    });
}

exports.delete = function (req, res) {
    ActivityType.findByIdAndRemove(req.params.activityType_id, (err, deleted) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!deleted) return res.status(404).send({errors: [{errmsg: 'ActivityType not found'}]});
        deleted.remove();
        return res.json({deleted: deleted});
    });
}