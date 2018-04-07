var express = require('express');
var router = express.Router();
var Activity = require('../controllers/activities');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/activities  ListActivities
 * @apiName ListActivities
 * @apiDescription
 * Get a list of all activities for the requesting user's organization. The requesting user will not be able to request activities outside of the organization. Can specify the limit, page, and sort for pagination.
 * 
 * @apiGroup Activities
 *
 * @apiUse RequestHeaders
 * @apiUse ActivitiesSuccess
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Activity.getAll);

/**
 * @api {get} /api/activities/:id  GetActivity
 * @apiName GetActivity
 * @apiDescription
 * Get the activity within the requesting user's organization given an id.
 * 
 * @apiGroup Activities
 * 
 * @apiUse ActivitySuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Activity.get)

/**
 * @api {post} /api/activities  PostActivity
 * @apiName PostActivity
 * @apiDescription
 * Create a new activity within the requesting user's organization. If the user is an admin, they can create an activity associated with any typing profile within their organization. If the requesting user is not an admin, they can only create an activity for themselves.
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
 * Update an existing activity within the requesting user's organization given an id. Not implemented because no user should need to update activities (they should be immutable).
 * 
 * @apiGroup Activities
 *
 * @apiUse ActivityRequestBody
 * @apiUse ActivitySuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Activity.update);

/**
 * @api {delete} /api/activities/:id  DeleteActivity
 * @apiName DeleteActivity
 * @apiDescription
 * Deletes an existing activity within the requesting user's organization given an id. Not implemented because no user should need to delete activities (for recordkeeping purposes).
 * 
 * @apiGroup Activities
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Activity.delete);

module.exports = router;