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
 * @apiSuccess {Array} typingProfiles List of typingProfiles
 * @apiSuccess {String} typingProfiles._id UUID of the typing profile for the system.
 * @apiSuccess {User} typingProfiles.user The user that the typing profile is associated with.
 * @apiSuccess {Machine} typingProfiles.machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} typingProfiles.authStatus The authentication status of the typing profile.
 * @apiSuccess {Boolean} typingProfiles.lockStatus The lock status of the typing profile.
 * @apiSuccess {String} typingProfiles.accessToken The access token for the typing profile's session.
 * @apiSuccess {String} typingProfiles.tensorFlowModel The tensor flow model of the typing profile.
 * @apiSuccess {Number} typingProfiles.__v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "user": "bb4fd2d5aa0f2f041258e517",
 *              "machine": "bb4fd2d5aa0f2f041258e517",
 *              "authStatus": "false",
 *              "lockStatus": "false",
 *              "accessToken": "bb4fd2d5aa0f2aa4123e517a",
 *              "tensorFlowModel: "testModelString",
 *              "__v": 0
 *          }
 *     ]
 */
router.get('/', middleware.requireAdmin, TypingProfile.getAll);

/**
 * @api {get} /api/typingProfiles/:id  GetTypingProfile
 * @apiName GetTypingProfile
 * @apiDescription
 * Get a specific typing profile.
 * 
 * @apiGroup TypingProfiles
 * @apiUse TypingProfileSuccess
 */
router.get('/:typingProfile_id', TypingProfile.get)

/**
 * @api {post} /api/typingProfiles  PostTypingProfile
 * @apiName PostTypingProfile
 * @apiDescription
 * Post a new typing profile.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiParam {User} user The user that the typing profile is associated with.
 * @apiParam {Machine} machine The machine that the typing profile is assigned to.
 * @apiParam {Boolean} authStatus The authentication status of the typing profile.
 * @apiParam {Boolean} lockStatus The lock status of the typing profile.
 * @apiParam {String} accessToken The access token for the typing profile's session.
 * @apiParam {String} tensorFlowModel The tensor flow model of the typing profile.
 * @apiParamExample {json} Request-Example
 *     {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "authStatus": "false",
 *          "lockStatus": "false",
 *          "accessToken": "bb4fd2d5aa0f2aa4123e517a",
 *          "tensorFlowModel: "testModelString",
 *     }
 * 
 * @apiUse TypingProfileSuccess
 */
router.post('/', TypingProfile.post);

/**
 * @api {put} /api/typingProfiles/:id  UpdateTypingProfile
 * @apiName UpdateTypingProfile
 * @apiDescription
 * Update a typing profile.
 * 
 * @apiGroup TypingProfiles
 * 
 * @apiParam {User} user The user that the typing profile is associated with.
 * @apiParam {Machine} machine The machine that the typing profile is assigned to.
 * @apiParam {Boolean} authStatus The authentication status of the typing profile.
 * @apiParam {Boolean} lockStatus The lock status of the typing profile.
 * @apiParam {String} accessToken The access token for the typing profile's session.
 * @apiParam {String} tensorFlowModel The tensor flow model of the typing profile.
 * @apiParamExample {json} Request-Example
 *     {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "authStatus": "false",
 *          "lockStatus": "false",
 *          "accessToken": "bb4fd2d5aa0f2aa4123e517a",
 *          "tensorFlowModel: "testModelString",
 *     }
 * 
 * @apiUse TypingProfileSuccess
 */
router.put('/:typingProfile_id', middleware.requireAdmin, TypingProfile.update);

/**
 * @api {delete} /api/typingProfiles/:id  DeleteTypingProfile
 * @apiName DeleteTypingProfile
 * @apiDescription
 * Delete a typing profile.
 * @apiGroup TypingProfiles
 */
router.delete('/:typingProfile_id', middleware.requireAdmin, TypingProfile.delete);

module.exports = router;