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
 *
 * @apiUse UserSuccess
 * @apiUse UnauthorizedError
 */
router.get('/me', middleware.requireAuth, User.me);

/**
 * @api {get} /api/users  ListUsers
 * @apiName ListUsers
 * @apiDescription 
 * Get a list of all users
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * 
 * @apiSuccess {Array} users List of users
 * @apiSuccess {String} users._id  UUID of the user for the system
 * @apiSuccess {String} users.email User's email
 * @apiSuccess {String} users.name User's name
 * @apiSuccess {String} users.phoneNumber User's phone number
 * @apiSuccess {Organization} users.organization User's organization
 * @apiSuccess {Boolean} users.isAdmin  Whether user is a system administrator
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     { 
 *       "users": [
 *          {
 *            "_id": "5a2c87d5f8de982a759cedf0",
 *            "email": "test@example.com",
 *            "name": "Hosh Weinstein",
 *            "organization": "5a4c019629015e0c8b9c1737"
 *            "isAdmin": false
 *          }
 *       ]
 *     }
 * 
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, User.getAll);

/**
 * @api {get} /api/users/:id  GetUser
 * @apiName GetUser
 * @apiDescription 
 * End point for user's to get a specific user's information.
 * 
 * @apiGroup Users
 * @apiUse RequestHeaders
 * @apiUse UserSuccess
 * 
 * @apiUse UserError
 */
router.get('/:id', middleware.requireAuth, User.get);

/**
 * @api {post} /api/users  PostUser
 * @apiName PostUser
 * @apiDescription 
 * Creates a user and returns the newly created user.
 * 
 * @apiGroup Users
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 *
 * @apiUse UserSuccess
 * @apiUse UserError
 */
router.post('/', middleware.requireAdmin, User.post);

/**
 * @api {put} /api/users/:id  UpdateUser
 * @apiName UpdateUser
 * @apiDescription 
 * Update a user with optional password update. Returns the updated user. Include "password" in body to change password.
 * Enqueues an SQS job.
 * 
 * @apiGroup Users
 * @apiUse RequestHeaders
 * @apiUse UserRequestBody
 *
 * @apiUse UserSuccess
 * @apiUse UserError
 */
router.put('/:id', middleware.requireAuth, User.update);

/**
 * @api {delete} /api/users/:id  DeleteUser
 * @apiName DeleteUser
 * @apiDescription 
 * End point to delete a specific user.
 * @apiGroup Users
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, User.delete);

module.exports = router;