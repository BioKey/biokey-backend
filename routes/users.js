const express = require('express');
const router = express.Router();
const User = require('../controllers/users');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/users/me Me
 * @apiName Me
 * @apiDescription 
 * End point for user's to get their user information. This endpoint
 * requires user's to be authenticated and to provide their access token
 * in the request header.
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
 * Get a list of all existing users in the administrator's organization.
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
 * Gets a specific user's information when provided their id.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserSuccess
 * @apiUse UserError
 */
router.get('/:id', middleware.requireAuth, User.get);

/**
 * @api {post} /api/users  PostUser
 * @apiName PostUser
 * @apiDescription 
 * Creates a new user, adds the user to the organization and returns the user as an object. 
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 * @apiUse UserSuccess
 * @apiUse UserError
 */
router.post('/', middleware.requireAdmin, User.post);

/**
 * @api {put} /api/users/:id  UpdateUser
 * @apiName UpdateUser
 * @apiDescription 
 * Update a user with optional password update. Returns the updated user. Include "password" in body to change password. Enqueues an SQS job.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 * @apiUse UserSuccess
 * @apiUse UserError
 */
router.put('/:id', middleware.requireAuth, User.update);

/**
 * @api {delete} /api/users/:id  DeleteUser
 * @apiName DeleteUser
 * @apiDescription 
 * End point to delete a specific user.
 *
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, User.delete);

module.exports = router;