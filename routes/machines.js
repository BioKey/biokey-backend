var express = require('express');
var router = express.Router();
var Machine = require('../controllers/machines');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

//TODO: add docs

router.get('/', Machine.getAll);

router.get('/:machine_id', Machine.get)

router.post('/', Machine.post);

router.put('/:machine_id', Machine.update);

router.delete('/:machine_id', Machine.delete);

module.exports = router;