/**
 * @api /api/activityTypes  ListActivityTypes
 * @apiName ListActivityTypes
 * @apiDescription
 * Get a list of all activity types
 * 
 * @apiGroup ActivityTypes
 * 
 * @apiSuccess {Array} activityTypes List of activityTypes
 * @apiSuccess {String} activityTypes._id UUID of the activity type for the system
 * @apiSuccess {String} activityTypes.description Unique description of the activity type
 * @apiSuccess {String} activityTypes.importance Severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "activityTypes": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "description": "Lockout",
 *              "importance": "MEDIUM"
 *          }
 *       ]
 *     }
 * 
 * @apiUse UnauthorizedError
 */
/**
 * @apiDefine UnauthorizedError
 * 
 * @apiError (Error 401) Unauthorized Only authenticated users can access.
 */
/**
 * @apiDefine GrantTokenSuccess
 * 
 * @apiSuccess {String} token  A JSON web token to be used on following requests.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "token": "123456789..."
 *     }
 */

/**
 * @apiDefine UserRequestBody
 * 
 * @apiParam {Object} user The user object being created/updated.
 * @apiParam {String} user.name The user's new name
 * @apiParam {String} user.email The user's new email
 * @apiParam {String} user.phoneNumber The user's new phone number
 * @apiParam {Organization} user.organization The user's new organization
 * @apiParam {String} user.password (Optional) The password to set for the user. Optional on put.
 * @apiParam {Boolean} user.isAdmin The user's new isAdmin state
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "user": {
 *         "name": "Hosh Weinstein",
 *         "email": "test@example.com",
 *         "phoneNumber": "519-493-4342",
 *         "organization": "5a4c019629015e0c8b9c1737",
 *         "password": "test123",
 *         "isAdmin": false
 *       }
 *     }
 */

/**
 * @apiDefine UserSuccess
 *
 * @apiSuccess {Object} user The user that was referenced
 * @apiSuccess {String} user._id  UUID of the user for the system
 * @apiSuccess {String} user.name User's name
 * @apiSuccess {String} user.email User's email
 * @apiSuccess {String} user.phoneNumber The user's new phone number
 * @apiSuccess {Organization} user.organization User's organization
 * @apiSuccess {Boolean} user.isAdmin  Whether user is a system administrator
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "user": {
 *         "_id": "5a2c87d5f8de982a759cedf0",
 *         "name": "Hosh Weinstein",
 *         "email": "test@example.com",
 *         "phoneNumber": "519-493-4342",
 *         "organization": "5a4c019629015e0c8b9c1737"
 *         "isAdmin": false
 *       }
 *     }
 */

/**
 * @apiDefine ActivitySuccess
 * @apiSuccess {Object} activity The requested activity
 * @apiSuccess {String} activity._id UUID of the activity for the system
 * @apiSuccess {Number} activity.timestamp Time that the activity occurred
 * @apiSuccess {TypingProfile} activity.typingProfile The typing profile associated with the activity
 * @apiSuccess {ActivityType} activity.activityType The type of the activity
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "activity": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "typingProfile": "5a4c08cd19d0a40d9c051653",
 *          "activityType": "5a4c019629015e0c8b9c1737",
 *          "timestamp": 234567
 *        }
 *     }
 */

/**
 * @apiDefine ActivityTypeSuccess
 * @apiSuccess {Object} activityType The requested activity type
 * @apiSuccess {String} activityType._id UUID of the activity type for the system
 * @apiSuccess {String} activityType.description Unique description of the activity type
 * @apiSuccess {String} activityType.importance Severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "activityType": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "description": "Lockout",
 *          "importance": "MEDIUM"
 *        }
 *     }
 */

/**
 * @apiDefine KeystrokeSuccess
 * @apiSuccess {Object} keystroke The requested keystroke
 * @apiSuccess {String} keystroke._id UUID of the keystroke for the system.
 * @apiSuccess {String} keystroke.character The key that was pressed/released.
 * @apiSuccess {Number} keystroke.timestamp The time that the keystroke occurred.
 * @apiSuccess {String} keystroke.upOrDown Specifies whether the key was pressed or released. One of {"U", "D"}
 * @apiSuccess {TypingProfile} keystroke.typingProfile The typing profile that submitted the keystoke.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "keystroke": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "upOrDown": "D",
 *          "typingProfile": "bb4fd2d5aa0f2f041258e517"
 *        }
 *      }
 */

/**
 * @apiDefine MachineSuccess
 * @apiSuccess {Object} machine The requested machine
 * @apiSuccess {String} machine._id UUID of the machine for the system.
 * @apiSuccess {String} machine.mac The machine's unique MAC address.
 * @apiSuccess {Organization} machine.organization The organization that the machine is assigned to.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "machine": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "mac": "00:0a:95:9d:68:16",
 *          "organization": "5a4fd2d5fb0f2f041278e510"
 *        }
 *      }
 */

/**
 * @apiDefine OrganizationSuccess
 * @apiSuccess {Object} organization The requested organization
 * @apiSuccess {String} organization._id UUID of the organization for the system.
 * @apiSuccess {String} organization.name The organization's unique name.
 * @apiSuccess {Number} organization.maxUsers The number of users that the organization may have.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "organization": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "name": "testOrganization",
 *          "maxUsers": "100"
 *        }
 *     }
 */

/**
 * @apiDefine TypingProfileRequest
 * @apiParam {User} user The user that the typing profile is associated with.
 * @apiParam {Machine} machine The machine that the typing profile is assigned to.
 * @apiParam {Boolean} isLocked The lock status of the typing profile.
 * @apiParam {String} tensorFlowModel The tensor flow model of the typing profile.
 * 
 * @apiParamExample Request (example):
 *     {
 *       "typingProfile": {
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "isLocked": "false",
 *          "tensorFlowModel": "testModelString"
 *        }
 *      }
 */

/**
 * @apiDefine TypingProfileSuccess
 * @apiSuccess {String} _id UUID of the typing profile for the system.
 * @apiSuccess {User} user The user that the typing profile is associated with.
 * @apiSuccess {Machine} machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} isLocked The lock status of the typing profile.
 * @apiSuccess {String} tensorFlowModel The tensor flow model of the typing profile.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "typingProfile": {
 *          "_id": "5a4fd2d5fb0f2f041278e510",
 *          "user": "bb4fd2d5aa0f2f041258e517",
 *          "machine": "bb4fd2d5aa0f2f041258e517",
 *          "isLocked": "false",
 *          "tensorFlowModel": "testModelString"
 *        }
 *      }
 */

 /**
  * @apiDefine AdminError
  * @apiError (Errors) {text} 401 Unauthorized. Only administrators can access.
  * @apiError (Errors) {text} 500 Internal server error.
  */

 /**
  * @apiDefine UserError
  * @apiError (Errors) {text} 401 Unauthorized. You do not have permission to access this data.
  * @apiError (Errors) {text} 500 Internal server error.
  */

 /**
  * @apiDefine RequestHeaders
  * @apiHeader {String} authorization A valid JSON web token
  */