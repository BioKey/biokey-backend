const express = require('express');
const router = express.Router();
const StatusUpdate = require('../controllers/statusUpdates');
const middleware = require('../services/middleware');

/**
 * @api {post} /api/statusUpdates statusUpdates
 * @apiName statusUpdates
 * @apiDescription
 * Endpoint for clients to send status updates to the server.
 * 
 * @apiGroup StatusUpdates
 * 
 * @apiParam {TypingProfile} typingProfile The client's (potentially updated) TypingProfile
 * @apiParam {String} phoneNumber The client's (potentially updated) phone number
 * @apiParam {String} googleAuthKey The client's (potentially updated) Google authentication key
 * @apiParamExample {json} Request-Example:
 *     {
 *          "typingProfile": {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "user": "bb4fd2d5aa0f2f041258e517",
 *              "machine": "bb4fd2d5aa0f2f041258e517",
 *              "isLocked": "false",
 *				"lastHeartbeat": "2020-04-24T11:41:47.280Z",
 *				"tensorFlowModel": "testModelString"	
 *              "endpoint": "https://aws.amazon.com",
 *              "challengeStrategies": [],
 *				"threshold": []    
 *          },
 *          "phoneNumber": "+1555555555",
 *          "googleAuthKey": "GOOGLE_API_KEY"
 *     }
 * 
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, StatusUpdate.post);

module.exports = router;