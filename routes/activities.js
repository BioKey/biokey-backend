var express = require('express');
var router = express.Router();
var Activity = require('../controllers/activities');

//TODO: add docs

router.get('/', Activity.getAll);

router.get('/:activity_id', Activity.get)

router.post('/', Activity.post);

router.put('/:activity_id', Activity.update);

router.delete('/:activity_id', Activity.delete);

module.exports = router;