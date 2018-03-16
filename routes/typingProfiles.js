var express = require('express');
var router = express.Router();
var TypingProfile = require('../controllers/typingProfiles');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/typingProfiles  ListTypingProfiles
 * @apiName ListTypingProfiles
 * @apiDescription
 * Get a list of all typingProfiles for a user in the administrator's organization
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
 * @apiSuccess {String} typingProfiles.endpoint The sqs endpoint of the typing profile.
 * @apiSuccess {Array} typingProfiles.challengeStrategies The challenge strategies of the typing profile.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "typingProfiles": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "user": "bb4fd2d5aa0f2f041258e517",
 *              "machine": "bb4fd2d5aa0f2f041258e517",
 *              "isLocked": "false",
 *				"lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *				"tensorFlowModel": "testModelString"	
 *              "endpoint": "https://aws.amazon.com",
 *              "challengeStrategies": []
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
 * @api {post} /api/typingProfiles/:id/heartbeat  PostHeartBeat
 * @apiName PostHeartbeat
 * @apiDescription
 * Recieves a hearbeat request from the client to verify client is online and secure.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 * 
 */
router.post('/:id/heartbeat', middleware.requireAuth, TypingProfile.heartbeat)

/**
 * @api {post} /api/typingProfiles/machine/:mac  PostMachineTypingProfile
 * @apiName PostMachineTypingProfile
 * @apiDescription
 * Create a new machine and/or typing profile if they do not exist. If they do, then get the typing profile given a user's token and machine mac.
 * 
 * @apiGroup TypingProfiles
 * @apiUse RequestHeaders
 * @apiUse TypingProfileSuccess
 * @apiUse UnauthorizedError
 */
router.post('/machine/:mac', middleware.requireAuth, TypingProfile.postTypingProfileFromMachine)

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
 * Update a typing profile. Enqueues an SQS job.
 * 
 * @apiSampleRequest sqsJob
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