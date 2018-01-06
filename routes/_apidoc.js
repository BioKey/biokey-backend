/**
 * @apiDefine UnauthorizedError
 * @apiError (Error 401) Unauthorized Only authenticated users can access.
 */
/**
 * @apiDefine GrantTokenSuccess
 * @apiSuccess {String} token  A JSON web token to be used on following requests.
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "token": "123456789..."
 *     }
 */

/**
 * @apiDefine UserSuccess
 * @apiSuccess {String} _id  UUID of the user for the system
 * @apiSuccess {String} email User's email
 * @apiSuccess {String} name User's name
 * @apiSuccess {Number} __v Version code of the schema being used
 * @apiSuccess {Boolean} isAdmin  Whether user is a system administrator
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "_id": "5a2c87d5f8de982a759cedf0",
 *       "email": "test@example.com",
 *       "name": "Hosh Weinstein",
 *       "__v": 0,
 *       "isAdmin": false
 *     }
 */

/**
 * @apiDefine ActivitySuccess
 * @apiSuccess {String} _id UUID of the activity for the system
 * @apiSuccess {Number} timestamp Time that the activity occurred
 * @apiSuccess {TypingProfile} typingProfile The typing profile associated with the activity
 * @apiSuccess {ActivityType} activityType The type of the activity
 * @apiSuccess {Number} __v Version code of the schema being used
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "typingProfile": "5a4c08cd19d0a40d9c051653",
 *        "activityType": "5a4c019629015e0c8b9c1737",
 *        "timestamp": 234567
 *        "__v": 0
 *     }
 */

/**
 * @apiDefine ActivityTypeSuccess
 * @apiSuccess {String} _id UUID of the activity type for the system
 * @apiSuccess {String} description Unique description of the activity type
 * @apiSuccess {String} importance Severity level. One of {"LOW", "MEDIUM", "HIGH"}
 * @apiSuccess {Number} __v Version code of the schema being used
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "description": "Lockout",
 *        "importance": "MEDIUM",
 *        "__v": 0
 *     }
 */

/**
 * @apiDefine KeystrokeSuccess
 * @apiSuccess {String} _id UUID of the keystroke for the system.
 * @apiSuccess {String} character The key that was pressed/released.
 * @apiSuccess {Number} timestamp The time that the keystroke occurred.
 * @apiSuccess {String} upOrDown Specifies whether the key was pressed or released. One of {"U", "D"}
 * @apiSuccess {TypingProfile} typingProfile The typing profile that submitted the keystoke.
 * @apiSuccess {Number} __v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "character": "R",
 *        "timestamp": 3456732435432,
 *        "upOrDown": "D",
 *        "typingProfile": "bb4fd2d5aa0f2f041258e517",
 *        "__v": 0
 *     }
 */

/**
 * @apiDefine MachineSuccess
 * @apiSuccess {String} _id UUID of the machine for the system.
 * @apiSuccess {String} mac The machine's unique MAC address.
 * @apiSuccess {Organization} organization The organization that the machine is assigned to.
 * @apiSuccess {Number} __v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "mac": "00:0a:95:9d:68:16",
 *        "organization": "testOrganization",
 *        "__v": 0
 *     }
 */

/**
 * @apiDefine OrganizationSuccess
 * @apiSuccess {String} _id UUID of the organization for the system.
 * @apiSuccess {String} name The organization's unique name.
 * @apiSuccess {Number} maxUsers The number of users that the organization may have.
 * @apiSuccess {[String]} challengeStrategies The authentication strategies that the organization accepts.
 * @apiSuccess {Number} defaultThreshold The certainty threshold for users' continuous authentication.
 * @apiSuccess {Number} __v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "name": "testOrganization",
 *        "maxUsers": "100",
 *        "challengeStrategies": "["Password", "Google Auth"]",
 *        "defaultThreshold": "100",
 *        "__v": 0
 *     }
 */

/**
 * @apiDefine TypingProfileSuccess
 * @apiSuccess {String} _id UUID of the typing profile for the system.
 * @apiSuccess {User} user The user that the typing profile is associated with.
 * @apiSuccess {Machine} machine The machine that the typing profile is assigned to.
 * @apiSuccess {Boolean} authStatus The authentication status of the typing profile.
 * @apiSuccess {Boolean} lockStatus The lock status of the typing profile.
 * @apiSuccess {String} accessToken The access token for the typing profile's session.
 * @apiSuccess {String} tensorFlowModel The tensor flow model of the typing profile.
 * @apiSuccess {Number} __v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *        "_id": "5a4fd2d5fb0f2f041278e510",
 *        "user": "bb4fd2d5aa0f2f041258e517",
 *        "machine": "bb4fd2d5aa0f2f041258e517",
 *        "authStatus": "false",
 *        "lockStatus": "false",
 *        "accessToken": "bb4fd2d5aa0f2aa4123e517a",
 *        "tensorFlowModel: "testModelString",
 *        "__v": 0
 *     }
 */