const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth');
const middleware = require('../services/middleware');

/**
 * @api {post} /api/auth/login Login
 * @apiName Login
 * @apiDescription 
 * End point for users to login. Users are granted a <a href="https://jwt.io/" target="_blank">JSON web token</a> to be used on authenticated network calls.
 * 
 * @apiGroup Auth
 *
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "test@example.com",
 *       "password": "password"
 *     }
 * 
 * @apiUse GrantTokenSuccess
 * @apiUse UnauthorizedError
 */
router.post('/login', middleware.requireSignin, Auth.login);

/**
 * @api {post} /api/auth/register Register
 * @apiName Register
 * @apiDescription 
 * End point for users to register for the system. Users are granted a <a href="https://jwt.io/" target="_blank">JSON web token</a> to be used on authenticated network calls.
 * 
 * @apiGroup Auth
 *
 * @apiParam {String} name The user's name
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Hosh Weinstein",
 *       "email": "test@example.com",
 *       "password": "password"
 *     }
 *
 * @apiUse GrantTokenSuccess
 * @apiUse UnauthorizedError
 */
router.post('/register', Auth.register);

/**
 * @api {post} /api/auth/register/:organization_id Register for Organization
 * @apiName Register for Organization
 * @apiDescription
 * End point for users to register under a particular organization. Users are granted a <a href="https://jwt.io/" target="_blank">JSON web token</a> to be used on authenticated network calls.
 * 
 * @apiGroup Auth
 * 
 * @apiParam {String} name The user's name
 * @apiParam {String} email The user's email
 * @apiParam {String} password The user's password
 * @apiParamExample {json} Request-Example
 *     {
 *       "name": "Hosh Weinstein",
 *       "email": "test@example.com",
 *       "password": "password"
 *     }
 * @apiUse GrantTokenSuccess
 * @apiUse UnauthorizedError
 */
router.post('/register/:organization_id', Auth.registerForOrganization);


module.exports = router;