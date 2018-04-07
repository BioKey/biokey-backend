const express = require('express');
const router = express.Router();
const User = require('../controllers/users');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/users/me Me
 * @apiName Me
 * @apiDescription 
 * Empty route that requires authentication.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserSuccess
 * @apiUse UnauthorizedError
 */
router.get('/me', middleware.requireAuth, User.me);

/**
 * @api {get} /api/users  ListUsers
 * @apiName ListUsers
 * @apiDescription 
 * Get a list of all users for the requesting user's organization. The requesting user will not be able to request users outside of the organization. Can specify the limit, page, and sort for pagination.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UsersSuccess
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, User.getAll);

/**
 * @api {get} /api/users/:id  GetUser
 * @apiName GetUser
 * @apiDescription 
 * Get the user within the requesting user's organization given an id. If the requesting user is not an admin, they can only get themselves.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserSuccess
 * @apiUse UnauthorizedError
 */
router.get('/:id', middleware.requireAuth, User.get);

/**
 * @api {post} /api/users PostUser
 * @apiName PostUser
 * @apiDescription 
 * Create a new user within the requesting user's organization.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 * @apiUse UserSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, User.post);

/**
 * @api {put} /api/users/:id  UpdateUser
 * @apiName UpdateUser
 * @apiDescription 
 * Update a user within the requesting user's organization. Also creates activities for each of the typing profiles owned by the user with this change.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 * @apiUse UserSuccess
 * @apiUse UnauthorizedError
 */
router.put('/:id', middleware.requireAuth, User.update);

/**
 * @api {delete} /api/users/:id  DeleteUser
 * @apiName DeleteUser
 * @apiDescription 
 * Delete an existing user within the requesting user's organization.
 *
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, User.delete);

module.exports = router;