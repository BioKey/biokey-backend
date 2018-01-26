var Keystroke = require('../models/keystroke');
var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');

exports.getAll = function (req, res) {
    Keystroke.find((err, keystrokes) => {
        if (err) return res.status(500).send({errors: [err]});
        return res.json(keystrokes);
    });
}

exports.get = function (req, res) {
    Keystroke.findById(req.params.keystroke_id, (err, keystroke) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!keystroke) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});
        return res.json({keystroke: keystroke});
    });
}

exports.post = function (req, res) {
    var keystroke = new Keystroke(req.body.keystroke);
    //Try to find the TypingProfile
    TypingProfile.findById(keystroke.typingProfile, (err, typingProfile) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
        //Determine if the user requesting the post is the same one, or an admin
        User.findById(req.user, (err, user) => {
            if(err) return res.status(500).send('There was a problem with your session.');
            if(!user.isAdmin && user._id!=typingProfile.user) return res.status(401).send('You are not authorized to perform this action.');
            //Save keystroke
            keystroke.save(err => {
                if(err) return res.status(500).send({errors: [err]});
                return res.json({keystroke: keystroke});
            });
        });
    });
}

exports.update = function (req, res) {
    Keystroke.findById(req.params.keystroke_id, (err, keystroke) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!keystroke) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});

        keystroke.character = req.body.keystroke.character;
        keystroke.upOrDown = req.body.keystroke.upOrDown;
        keystroke.timestamp = req.body.keystroke.timestamp;
        keystroke.typingProfile = req.body.keystroke.typingProfile;

        //Try to find the typingProfile
        TypingProfile.findById(keystroke.typingProfile, (err, typingProfile) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
            //Save keystroke
            keystroke.save(err => {
                if (err) return res.status(500).send({errors: [err]});
                //TODO: send to machine learning server
                return res.json({updated: keystroke});
            });
        });
    });
}

exports.delete = function (req, res) {
    Keystroke.findByIdAndRemove(req.params.keystroke_id, (err, deleted) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!deleted) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});
        deleted.remove();
        return res.json({deleted: deleted});
    });
}