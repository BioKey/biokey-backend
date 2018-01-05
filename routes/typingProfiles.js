var express = require('express');
var router = express.Router();
var TypingProfile = require('../controllers/typingProfiles');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

//TODO: add docs

router.get('/', TypingProfile.getAll);

router.get('/:typingProfile_id', TypingProfile.get)

router.post('/', TypingProfile.post);

router.put('/:typingProfile_id', TypingProfile.update);

router.delete('/:typingProfile_id', TypingProfile.delete);

module.exports = router;