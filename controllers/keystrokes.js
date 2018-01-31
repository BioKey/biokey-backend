var Keystroke = require('../models/keystroke');
var TypingProfile = require('../models/typingProfile');
var User = require('../models/user');

const Q = require('q');

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
    // Get the keystrokes array, keeping in mind that req may only have one keystroke not in array form.
    var keystrokesRaw = req.body.keystrokes || [req.body.keystroke];
    if (keystrokesRaw.length == 0 || !keystrokesRaw[0]) return res.status(404).send({errors: [{errmsg: 'No keystrokes found'}]});

    // Try to find the TypingProfile
    TypingProfile.findById(keystrokesRaw[0].typingProfile, (err, typingProfile) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});

        // Determine if the user requesting the post is the same one, or an admin
        User.findById(req.user, (err, user) => {
            if (err) return res.status(500).send('There was a problem with your session.');
            if (!user.isAdmin && user._id != typingProfile.user) return res.status(401).send('You are not authorized to perform this action.');

            // Validate all keystrokes
            var validatePromises = [];
            var keystrokes = [];
            for (var i = 0; i < keystrokesRaw.length; i++) {
                var keystroke = new Keystroke(keystrokesRaw[i]);
                if (!keystroke || !keystrokesRaw[i]) return res.status(404).send({errors: [{errmsg: 'Invalid keystrokes found'}]});

                validatePromises.push(keystroke.validate());
                keystrokes.push(keystroke);
            }

            // Wait for all validations to complete
            Q.all(validatePromises).then(results => {
                // Save all keystrokes
                var savePromises = [];
                for (var i = 0; i < keystrokes.length; i++) {
                    var keystroke = new Keystroke(keystrokes[i]);
                    savePromises.push(keystroke.save());
                }

                // Wait for all saves to complete
                Q.all(savePromises).then(results => {
                    return res.json({keystrokes: keystrokes});
                }, err => {
                    return res.status(500).send({errors: [err]});
                })
            }, err => {
                return res.status(500).send({errors: [err]});
            })
        });
    });
}

exports.update = function (req, res) {
    Keystroke.findById(req.params.keystroke_id, (err, keystroke) => {
        if (err) return res.status(500).send({errors: [err]});
        if (!keystroke) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});

        keystroke.character = req.body.keystroke.character;
        keystroke.keyDown = req.body.keystroke.keyDown;
        keystroke.timestamp = req.body.keystroke.timestamp;
        keystroke.typingProfile = req.body.keystroke.typingProfile;

        // Try to find the typingProfile
        TypingProfile.findById(keystroke.typingProfile, (err, typingProfile) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
            // Save keystroke
            keystroke.save(err => {
                if (err) return res.status(500).send({errors: [err]});
                // TODO: send to machine learning server
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