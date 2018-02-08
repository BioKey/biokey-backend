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
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "authorization": "123456789..."
 *     }
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
 * @apiSuccess {Array} users List of users
 * @apiSuccess {String} users._id  UUID of the user for the system
 * @apiSuccess {String} users.email User's email
 * @apiSuccess {String} users.name User's name
 * @apiSuccess {String} users.phoneNumber User's phone number
 * @apiSuccess {String} users.endpoint User's endpoint for updating the client
 * @apiSuccess {Organization} users.organization User's organization
 * @apiSuccess {Number} users.__v Version code of the schema being used
 * @apiSuccess {Boolean} users.isAdmin  Whether user is a system administrator
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *            "_id": "5a2c87d5f8de982a759cedf0",
 *            "email": "test@example.com",
 *            "name": "Hosh Weinstein",
 *            "organization": "5a4c019629015e0c8b9c1737"
 *            "__v": 0,
 *            "isAdmin": false
 *          }
 *     ]
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
 * @api {put} /api/users/:id  UpdateUser
 * @apiName UpdateUser
 * @apiDescription 
 * Update a user excluding password. Returns the updated user.
 * 
 * @apiGroup Users
 *
 * @apiUse RequestHeaders
 * @apiParam {String} name The user's new name
 * @apiParam {String} email The user's new email
 * @apiParam {Boolean} isAdmin The user's new isAdmin state
 * @apiParam {String} phoneNumber The user's new phone number
 * @apiParam {String} endpoint The user's new endpoint
 * @apiParam {Organization} organization The user's new organization
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Hosh Weinstein",
 *       "email": "test@example.com",
 *       "isadmin": false,
 *       "phoneNumber": "555-555-5555"
 *       "endpoint": "example.com/api/6b3b015129015e0a8b9c1649"
 *       "organization": "5a4c019629015e0c8b9c1737"
 *     }
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