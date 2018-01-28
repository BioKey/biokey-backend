var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');
var Machine = require('../models/machine');

exports.getAll = function (req, res) {
    TypingProfile.find((err, typingProfiles) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json(typingProfiles);
    });
}

exports.get = function (req, res) {
    TypingProfile.findById(req.params.typingProfile_id, (err, typingProfile) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
        //Determine if the user requesting the get is the same one, or an admin
        User.findById(req.user, (err, user) => {
            if(err) return res.status(500).send('There was a problem with your session.');
            if(!user.isAdmin && user._id!=typingProfile.user) return res.status(401).send('You are not authorized to perform this action.');
            return res.json({typingProfile: typingProfile});
        });
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
            //TODO: Hash typing profile once received
            
            //Determine if the user requesting the post is the same one, or an admin
            if(!user.isAdmin && user._id!=typingProfile.user) return res.status(401).send('You are not authorized to perform this action.');
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