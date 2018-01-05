var express = require('express');
var router = express.Router();
var Keystroke = require('../models/keystroke');
var TypingProfile = require('../models/typingProfile');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

router.route('/')

    .post(parseUrlencoded, parseJSON, (req, res) => {
        console.log(req.body.keystroke);
        var keystroke = new Keystroke(req.body.keystroke);

        //Try to find the TypingProfile
        TypingProfile.findById(keystroke.typingProfile, (err, typingProfile) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!typingProfile) return res.status(404).send({errors: [{errmsg: 'TypingProfile not found'}]});
            //Save keystroke
            keystroke.save(err => {
                if(err) return res.status(500).send({errors: [err]});
                return res.json({keystroke: keystroke});
            });
        });
    })

    .get(parseUrlencoded, parseJSON,(req, res) => {
        Keystroke.find((err, keystrokes) => {
            if (err) return res.status(500).send({errors: [err]});
            return res.json({keystrokes: keystrokes});
        });
    });

router.route('/:keystroke_id')

    .get(parseUrlencoded, parseJSON, (req, res) => {
        Keystroke.findById(req.params.keystroke_id, (err, keystroke) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!keystroke) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});
            return res.json({keystroke: keystroke});
        });
    })

    .put(parseUrlencoded, parseJSON, (req, res) => {
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
                    return res.json({updated: keystroke});
                });
            });
        });
    })

    .delete(parseUrlencoded, parseJSON, (req, res) => {
        Keystroke.findByIdAndRemove(req.params.keystroke_id, (err, deleted) => {
            if (err) return res.status(500).send({errors: [err]});
            if (!deleted) return res.status(404).send({errors: [{errmsg: 'Keystroke not found'}]});
            deleted.remove();
            return res.json({deleted: deleted});
        });
    });

module.exports = router;