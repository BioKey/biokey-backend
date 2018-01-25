var express = require('express');
var router = express.Router();
var Activity = require('../controllers/activities');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/activities  ListActivities
 * @apiName ListActivities
 * @apiDescription
 * Get a list of all activities
 * 
 * @apiGroup Activities
 * 
 * @apiUse RequestHeaders
 * @apiSuccess {Array} activities List of activities
 * @apiSuccess {String} activities._id UUID of the activity for the system
 * @apiSuccess {Number} activities.timestamp Time that the activity occurred
 * @apiSuccess {TypingProfile} activities.typingProfile The typing profile associated with the activity
 * @apiSuccess {ActivityType} activities.activityType The type of the activity
 * @apiSuccess {Number} activities.__v Version code of the schema being used
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "typingProfile": "5a4c08cd19d0a40d9c051653",
 *              "activityType": "5a4c019629015e0c8b9c1737",
 *              "timestamp": 234567
 *              "__v": 0
 *          }
 *     ]
 * 
 * @apiUse UnauthorizedError
 */
router.get('/', middleware.requireAuth, Activity.getAll);

/**
 * @api {get} /api/activities/:id  GetActivity
 * @apiName GetActivity
 * @apiDescription
 * Get a specific activity.
 * 
 * @apiGroup Activities
 * @apiUse RequestHeaders
 * @apiUse ActivitySuccess
 * @apiUse UnauthorizedError
 */
router.get('/:activity_id', middleware.requireAuth, Activity.get)

/**
 * @api {post} /api/activities  PostActivity
 * @apiName PostActivity
 * @apiDescription
 * Post a new activity.
 * 
 * @apiGroup Activities
 * 
 * @apiUse RequestHeaders
 * @apiParam {Number} timestamp The new activity's timestamp
 * @apiParam {TypingProfile} typingProfile The new activity's typing profile
 * @apiParam {ActivityType} activityType The new activity's type
 * @apiParamExample {json} Request-Example
 *     {
 *          "typingProfile": "5a4c08cd19d0a40d9c051653",
 *		    "activityType": "5a4c019629015e0c8b9c1737",
 *		    "timestamp": 234567
 *     }
 * 
 * @apiUse ActivitySuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, Activity.post);

/**
 * @api {put} /api/activities/:id  UpdateActivity
 * @apiName UpdateActivity
 * @apiDescription
 * Update an activity.
 * 
 * @apiGroup Activities
 * 
 * @apiUse RequestHeaders
 * @apiParam {Number} timestamp The activity's new timestamp
 * @apiParam {TypingProfile} typingProfile The activity's new typing profile
 * @apiParam {ActivityType} activityType The activity's new type
 * @apiParamExample {json} Request-Example
 *     {
 *          "typingProfile": "5a4c08cd19d0a40d9c051653",
 *		    "activityType": "5a4c019629015e0c8b9c1737",
 *		    "timestamp": 234567
 *     }
 * 
 * @apiUse ActivitySuccess
 * @apiUse AdminError
 */
router.put('/:activity_id', middleware.requireAdmin, Activity.update); //NOTE FOR CODE REVIEW: should we be able to edit logs in prod?

/**
 * @api {delete} /api/activities/:id  DeleteActivity
 * @apiName DeleteActivity
 * @apiDescription
 * Delete an activity.
 * @apiGroup Activities
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:activity_id', middleware.requireAdmin, Activity.delete);

module.exports = router;