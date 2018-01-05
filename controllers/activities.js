const Activity = require('../models/activity');
const ActivityType = require('../models/activityType');
const TypingProfile = require('../models/typingProfile');

//RETURNS ALL THE ACTIVITIES FROM THE DATABASE
exports.getAll = function (req, res) {
    Activity.find((err, activities) => {
        if (err) return res.status(500).send("There was a problem finding the activities.");
        return res.status(200).json({activities: activities});
    });
}

//GETS A SINGLE ACTIVITY FROM THE DATABASE
exports.get = function (req, res) {
    Activity.findById(req.params.activity_id, (err, activity) => {
        if (err) return res.status(500).send("There was a problem finding the activity.");
        if (!activity) return res.status(404).send({errors: [{errmsg: 'No activity was found.'}]});
        return res.status(200).json({activity: activity});
    });
}

// POSTS A NEW ACTIVITY TO THE DATABASE
exports.post = function (req, res) {
    var activity = new Activity(req.body.activity);
    //Try to find the ActivityType
    ActivityType.findById(activity.activityType, (err, activityType) => {
        if (err) return res.status(500).send('There was a problem finding the requested activity type.');
        if (!activityType) return res.status(404).send('There was a problem finding the requested activity type.');
        //Try to find the TypingProfile
        TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
            if (err) return res.status(500).send('There was a problem finding the requested typing profile.');
            if (!typingProfile) return res.status(404).send('There was a problem finding the requested typing profile.');
            //Save Activity
            activity.save(err => {
                if(err) return res.status(500).send("There was a problem saving the activity.");
                return res.json({msg: "Activity saved!", activity: activity});
            });
        })
    });
}

// UPDATES A SINGLE ACTIVITY IN THE DATABASE
exports.update = function (req, res) {
    Activity.findById(req.params.activity_id, (err, activity) => {
        if (err) return res.status(500).send('There was a problem updating activity.');
        if (!activity) return res.status(404).send('No activity was found.');

        activity.activityType = req.body.activity.activityType;
        activity.typingProfile = req.body.activity.typingProfile;
        activity.timestamp = req.body.activity.timestamp;

        //Try to find the ActivityType
        ActivityType.findById(activity.activityType, (err, activityType) => {
            if (err) return res.status(500).send('There was a problem finding the requested activity type.');
            if (!activityType) return res.status(404).send('There was a problem finding the requested activity type.');
            //Try to find the TypingProfile
            TypingProfile.findById(activity.typingProfile, (err, typingProfile) => {
                if (err) return res.status(500).send('There was a problem finding the requested typing profile.');
                if (!typingProfile) return res.status(404).send('There was a problem finding the requested typing profile.');
                //Save Activity
                activity.save(err => {
                    if(err) return res.status(500).send('There was a problem saving the activity.');
                    return res.json({updated: activity});
                });
            });
        });
    });
}

// DELETES A SINGLE ACTIVITY FROM THE DATABASE
exports.delete = function (req, res) {
    Activity.findByIdAndRemove(req.params.activity_id, (err, deleted) => {
        if (err) return res.status(500).send('There was a problem deleting the activity.');
        if (!deleted) return res.status(404).send('No activity was found.');
        deleted.remove();
        return res.json({deleted: deleted});
    });
}