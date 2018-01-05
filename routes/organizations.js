var express = require('express');
var router = express.Router();
var Organization = require('../controllers/organizations');

//TODO: add docs

router.get('/', Organization.getAll);

router.get('/:machine_id', Organization.get)

router.post('/', Organization.post);

router.put('/:machine_id', Organization.update);

router.delete('/:machine_id', Organization.delete);

module.exports = router;