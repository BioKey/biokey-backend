var express = require('express');
var router = express.Router();
var Activity = require('../controllers/activities');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/activities  ListActivities
 * @apiName ListActivities
 * @apiDescription
 * Get a list of all activities for the requesting user's organization. The requesting user will not be able to request activities outside of the organization.
 * 
 * @apiGroup Activities
 * @apiUse ActivitiesSuccess
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Activity.getAll);

/**
 * @api {get} /api/activities/:id  GetActivity
 * @apiName GetActivity
 * @apiDescription
 * Given a the id of a specific activity within an organization, it's possible to extract the details of that activity.
 * 
 * @apiGroup Activities
 * @apiUse ActivitySuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Activity.get)

/**
 * @api {post} /api/activities  PostActivity
 * @apiName PostActivity
 * @apiDescription
 * The requesting user is able to create a new activity within an organization.
 * 
 * @apiGroup Activities
 *
 * @apiUse ActivityRequestBody
 * @apiUse ActivitySuccess
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, Activity.post);

/**
 * @api {put} /api/activities/:id  UpdateActivity
 * @apiName UpdateActivity
 * @apiDescription
 * The requesting user is able to update an existing activity within an organization. The endpoint will output an error if the activity does not exist. 
 * 
 * @apiGroup Activities
 *
 * @apiUse ActivityRequestBody
 * @apiUse ActivitySuccess
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.put('/:id', middleware.requireAdmin, Activity.update);

/**
 * @api {delete} /api/activities/:id  DeleteActivity
 * @apiName DeleteActivity
 * @apiDescription
 * Simply deletes an activity within an organization. If the activity does not exist, the endpoint will output an error. 
 * 
 * @apiGroup Activities
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Activity.delete);

module.exports = router;