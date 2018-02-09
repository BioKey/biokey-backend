var express = require('express');
var router = express.Router();
var ActivityType = require('../controllers/activityTypes');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/activityTypes  ListActivityTypes
 * @apiName ListActivityTypes
 * @apiDescription
 * Get a list of all activity types
 * 
 * @apiGroup ActivityTypes
 * 
 * @apiSuccess {Array} activityTypes List of activityTypes
 * @apiSuccess {String} activityTypes._id UUID of the activity type for the system
 * @apiSuccess {String} activityTypes.description Unique description of the activity type
 * @apiSuccess {String} activityTypes.importance Severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * @apiSuccess {Number} activityTypes.__v Version code of the schema being used
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "description": "Lockout",
 *              "importance": "MEDIUM",
 *              "__v": 0
 *          }
 *     ]
 * 
 * @apiUse UnauthorizedError
 */
router.get('/', middleware.requireAuth, ActivityType.getAll);

/**
 * @api {get} /api/activityTypes/:id  GetActivityType
 * @apiName GetActivityType
 * @apiDescription
 * Get a specific activity type.
 * 
 * @apiGroup ActivityTypes
 * @apiUse ActivityTypeSuccess
 * @apiUse UnauthorizedError
 */
router.get('/:id', middleware.requireAuth, ActivityType.get)

/**
 * @api {post} /api/activityTypes  PostActivityType
 * @apiName PostActivityType
 * @apiDescription
 * Post a new activity type.
 * 
 * @apiGroup ActivityTypes
 * 
 * @apiUse RequestHeaders
 * @apiParam {String} description Unique description of the new activity type
 * @apiParam {String} importance Severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * @apiParamExample {json} Request-Example
 *     {
 *          "description": "Lockout",
 *		    "importance": "MEDIUM"
 *     }
 * 
 * @apiUse ActivityTypeSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, ActivityType.post);

/**
 * @api {put} /api/activityTypes  UpdateActivityType
 * @apiName UpdateActivityType
 * @apiDescription
 * Update an activity type.
 * 
 * @apiGroup ActivityTypes
 * 
 * @apiUse RequestHeaders
 * @apiParam {String} description The new unique description of the activity type
 * @apiParam {String} importance The new severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * @apiParamExample {json} Request-Example
 *     {
 *          "description": "Lockout",
 *		    "importance": "MEDIUM"
 *     }
 * 
 * @apiUse ActivityTypeSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, ActivityType.update);

/**
 * @api {delete} /api/activityTypes/:id  DeleteActivityType
 * @apiName DeleteActivityType
 * @apiDescription
 * Delete an activity type.
 * @apiGroup ActivityTypes
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, ActivityType.delete);

router.route('/')

module.exports = router;