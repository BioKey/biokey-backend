var express = require('express');
var router = express.Router();
var Activity = require('../controllers/activities');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

//TODO: add docs

router.get('/', Activity.getAll);

router.get('/:activity_id', Activity.get)

router.post('/', Activity.post);

router.put('/:activity_id', Activity.update);

router.delete('/:activity_id', Activity.delete);

module.exports = router;