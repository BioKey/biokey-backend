var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');
var Machine = require('../models/machine');

//TODO: interact with the ML server for all of this.

exports.getAll = function (req, res) {
    TypingProfile.find((err, typingProfiles) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json({typingProfiles: typingProfiles});
    });
}

exports.get = function (req, res) {
    TypingProfile.findById(req.params.typingProfile_id, (err, typingProfile) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
        return res.json({typingProfile: typingProfile});
    });
}

exports.post = function (req, res) {
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
            //TODO: Hash typing profile once received
            typingProfile.save(err => {
                if(err) return res.status(500).send({errors: [err]});
                return res.json({typingProfile: typingProfile});
            });
        })
    });
}

exports.update = function (req, res) {
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
}

exports.delete = function (req, res) {
    TypingProfile.findByIdAndRemove(req.params.typingProfile_id, (err, deleted) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!deleted) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
        deleted.remove();
        return res.json({deleted: deleted});
    });
}