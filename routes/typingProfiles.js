var express = require('express');
var router = express.Router();
var TypingProfile = require('../controllers/typingProfiles');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/typingProfiles  ListTypingProfiles
 * @apiName ListTypingProfiles
 * @apiDescription
 * Get a list of all typingProfiles
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiSuccess {Array} typingProfiles List of typingProfiles
 * @apiSuccess {String} typingProfiles._id UUID of the typing profile for the system.
 * @apiSuccess {User} typingProfiles.user The user that the typing profile is associated with.
 * @apiSuccess {Machine} typingProfiles.machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} typingProfiles.authStatus The authentication status of the typing profile.
 * @apiSuccess {Boolean} typingProfiles.lockStatus The lock status of the typing profile.
 * @apiSuccess {String} typingProfiles.accessToken The access token for the typing profile's session.
 * @apiSuccess {String} typingProfiles.tensorFlowModel The tensor flow model of the typing profile.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "typingProfiles": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "user": "bb4fd2d5aa0f2f041258e517",
 *              "machine": "bb4fd2d5aa0f2f041258e517",
 *              "authStatus": "false",
 *              "lockStatus": "false",
 *              "accessToken": "bb4fd2d5aa0f2aa4123e517a",
 *              "tensorFlowModel": "testModelString"
 *          }
 *        ]
 *      }
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, TypingProfile.getAll);

/**
 * @api {get} /api/typingProfiles/:id  GetTypingProfile
 * @apiName GetTypingProfile
 * @apiDescription
 * Get a specific typing profile.
 * 
 * @apiGroup TypingProfiles
 * @apiUse RequestHeaders
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.get('/:id', middleware.requireAuth, TypingProfile.get)

/**
 * @api {get} /api/typingProfiles/machine/:machine_mac  GetMachineTypingProfile
 * @apiName GetMachineTypingProfile
 * @apiDescription
 * Get a the typing profile given a user's token and machine id.
 * 
 * @apiGroup TypingProfiles
 * @apiUse RequestHeaders
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.get('/machine/:machine_mac', middleware.requireAuth, TypingProfile.getTypingProfileFromMachine)

/**
 * @api {post} /api/typingProfiles  PostTypingProfile
 * @apiName PostTypingProfile
 * @apiDescription
 * Post a new typing profile.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileRequest
 * 
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, TypingProfile.post);

/**
 * @api {put} /api/typingProfiles/:id  UpdateTypingProfile
 * @apiName UpdateTypingProfile
 * @apiDescription
 * Update a typing profile.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileRequest
 * 
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.put('/:id', middleware.requireAuth, TypingProfile.update);

/**
 * @api {delete} /api/typingProfiles/:id  DeleteTypingProfile
 * @apiName DeleteTypingProfile
 * @apiDescription
 * Delete a typing profile.
 * @apiGroup TypingProfiles
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, TypingProfile.delete);

module.exports = router;