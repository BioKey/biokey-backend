var express = require('express');
var router = express.Router();
var TypingProfile = require('../controllers/typingProfiles');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/typingProfiles  ListTypingProfiles
 * @apiName ListTypingProfiles
 * @apiDescription
 * Get a list of all typing profiles for the requesting user's organization. The requesting user will not be able to request profiles outside of the organization. Can specify the limit, page, and sort for pagination.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse TypingProfilesSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, TypingProfile.getAll);

/**
 * @api {get} /api/typingProfiles/:id  GetTypingProfile
 * @apiName GetTypingProfile
 * @apiDescription
 * Get the typing profile within the requesting user's organization given an id.
 * 
 * @apiGroup TypingProfiles
 *
 * @apiUse TypingProfileSuccess
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.get('/:id', middleware.requireAuth, TypingProfile.get)

/**
 * @api {post} /api/typingProfiles/:id/heartbeat  PostHeartBeat
 * @apiName PostHeartbeat
 * @apiDescription
 * Update the typing profile with the latest heartbeat from the client.
 * 
 * @apiGroup TypingProfiles
 *
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.post('/:id/heartbeat', middleware.requireAuth, TypingProfile.heartbeat)

/**
 * @api {post} /api/typingProfiles/machine/:mac  PostMachineTypingProfile
 * @apiName PostMachineTypingProfile
 * @apiDescription
 * Create a new machine and/or typing profile if they do not exist. If they do, then get the typing profile given a user's token and machine mac.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.post('/machine/:mac', middleware.requireAuth, TypingProfile.postTypingProfileFromMachine)

/**
 * @api {post} /api/typingProfiles  PostTypingProfile
 * @apiName PostTypingProfile
 * @apiDescription
 * Create a new typing profile within the requesting user's organization. If the user is an admin, they can create a typing profile associated with any user within their organization. If the requesting user is not an admin, they can only create an typing profile for themselves. Also creates an activity that the user created a typing profile. Also alerts the admin through text message that the user created a typing profile.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileRequestBody
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, TypingProfile.post);

/**
 * @api {put} /api/typingProfiles/:id  UpdateTypingProfile
 * @apiName UpdateTypingProfile
 * @apiDescription
 * Update an existing activity within the requesting user's organization given an id. If specified, can also update a user's phone number and google authentication key. Also creates an activity with the change. If the change was important (lock, unlock), alerts the admin through text message of the change.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileAndUserRequestBody  
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.put('/:id', middleware.requireAuth, TypingProfile.update);

/**
 * @api {delete} /api/typingProfiles/:id  DeleteTypingProfile
 * @apiName DeleteTypingProfile
 * @apiDescription
 * Deletes an existing typing profile within the requesting user's organization given an id.
 *
 * @apiGroup TypingProfiles
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, TypingProfile.delete);

module.exports = router;