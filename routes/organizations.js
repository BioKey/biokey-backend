var express = require('express');
var router = express.Router();
var Organization = require('../controllers/organizations');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});
var parseJSON = bodyParser.json();

//TODO: add docs

router.get('/', Organization.getAll);

router.get('/:machine_id', Organization.get)

router.post('/', Organization.post);

router.put('/:machine_id', Organization.update);

router.delete('/:machine_id', Organization.delete);

module.exports = router;