var express = require('express');
var router = express.Router();
var Keystroke = require('../controllers/keystrokes');

//TODO: add docs

router.get('/', Keystroke.getAll);

router.get('/:keystroke_id', Keystroke.get)

router.post('/', Keystroke.post);

router.put('/:keystroke_id', Keystroke.update);

router.delete('/:keystroke_id', Keystroke.delete);

module.exports = router;