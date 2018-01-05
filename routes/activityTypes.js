var express = require('express');
var router = express.Router();
var ActivityType = require('../controllers/activityTypes');

//TODO: add docs

router.get('/', ActivityType.getAll);

router.get('/:activityType_id', ActivityType.get)

router.post('/', ActivityType.post);

router.put('/:activityType_id', ActivityType.update);

router.delete('/:activityType_id', ActivityType.delete);

router.route('/')

module.exports = router;