var express = require('express');
var router = express.Router();
var TypingProfile = require('../controllers/typingProfiles');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/typingProfiles  ListTypingProfiles
 * @apiName ListTypingProfiles
 * @apiDescription
 * Get a list of all typingProfiles for an existing user in the administrator's organization.
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
 * Get a specific typing profile when an id is provided
 * 
 * @apiGroup TypingProfiles
 *
 * @apiUse TypingProfileSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 * @apiUse UnauthorizedError
 */
router.get('/:id', middleware.requireAuth, TypingProfile.get)

/**
 * @api {post} /api/typingProfiles/:id/heartbeat  PostHeartBeat
 * @apiName PostHeartbeat
 * @apiDescription
 * Recieves a hearbeat request from the client to verify client is online and secure.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse TypingProfileRequest
 * @apiUse TypingProfileSuccess
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
 * Creates a new typing profile for an existing user within an organization.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileRequest
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, TypingProfile.post);

/**
 * @api {put} /api/typingProfiles/:id  UpdateTypingProfile
 * @apiName UpdateTypingProfile
 * @apiDescription
 * Update a typing profile. Enqueues an SQS job.
 * 
 * @apiSampleRequest sqsJob
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse TypingProfileRequest  
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.put('/:id', middleware.requireAuth, TypingProfile.update);

/**
 * @api {delete} /api/typingProfiles/:id  DeleteTypingProfile
 * @apiName DeleteTypingProfile
 * @apiDescription
 * Delete a typing profile
 *
 * @apiGroup TypingProfiles
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, TypingProfile.delete);

module.exports = router;