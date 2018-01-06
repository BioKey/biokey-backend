const express = require('express');
const router = express.Router();
const User = require('../controllers/users');

/**
 * @api {get} /api/users  ListUsers
 * @apiName ListUsers
 * @apiDescription 
 * Get a list of all users
 * 
 * @apiGroup Users
 *
 * @apiSuccess {Array} users List of users
 * @apiSuccess {String} users._id  UUID of the user for the system
 * @apiSuccess {String} users.email User's email
 * @apiSuccess {String} users.name User's name
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
 */
 router.get('/', User.getAll);

/**
 * @api {get} /api/users/:id  GetUser
 * @apiName GetUser
 * @apiDescription 
 * End point for user's to get a specific user's information.
 * 
 * @apiGroup Users
 * @apiUse UserSuccess
 * 
 */
 router.get('/:id', User.get);

 /**
 * @api {put} /api/users/:id  UpdateUser
 * @apiName UpdateUser
 * @apiDescription 
 * Update a user excluding password. Returns the updated user.
 * 
 * @apiGroup Users
 *
 * @apiParam {String} name The user's new name
 * @apiParam {String} email The user's new email
 * @apiParam {Boolean} isAdmin The user's new isAdmin state
 * @apiParam {Organization} organization The user's new organization
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Hosh Weinstein",
 *       "email": "test@example.com",
 *       "isadmin": false,
 *       "organization": "5a4c019629015e0c8b9c1737"
 *     }
 *
 * @apiUse UserSuccess
 * 
 */
 router.put('/:id', User.update);

/**
 * @api {delete} /api/users/:id  DeleteUser
 * @apiName DeleteUser
 * @apiDescription 
 * End point to delete a specific user.
 * @apiGroup Users
 * 
 */
 router.delete('/:id', User.delete);

 module.exports = router;