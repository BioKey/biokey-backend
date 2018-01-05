var express = require('express');
var router = express.Router();
var Keystroke = require('../controllers/keystrokes');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

//TODO: add docs

router.get('/', Keystroke.getAll);

router.get('/:keystroke_id', Keystroke.get)

router.post('/', Keystroke.post);

router.put('/:keystroke_id', Keystroke.update);

router.delete('/:keystroke_id', Keystroke.delete);

module.exports = router;