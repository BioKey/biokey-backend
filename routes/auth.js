const express = require('express');
const router = express.Router();
const Authentication = require('../controllers/authentication');
const middleware = require('../services/middleware');

/**
 * @api {post} /api/auth/login Login
 * @apiVersion 0.1.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission user
 *
 * @apiParam {Number} id The Users-ID.
 *
 * @apiExample Example usage:
 * curl -i http://localhost/user/4711
 *
 * @apiSuccess {String}   token            A JSON web token to be used on following requests.
 *
 * @apiError NoAccessRight Only authenticated Admins can access the data.
 * @apiError UserNotFound   The <code>id</code> of the User was not found.
 *
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "token": "123456789..."
 *     }
 *
 * @apiErrorExample Response (example):
 *     HTTP/1.1 401 Not Authenticated
 *     {
 *       "error": "NoAccessRight"
 *     }
 */
router.post('/login', middleware.requireSignin, Authentication.login);
router.post('/register', Authentication.register);
router.get('/me', middleware.requireAuth, Authentication.me);

module.exports = router;