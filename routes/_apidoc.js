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
 *       "_id": "5a4fd2d5fb0f2f041278e510",
 *       "typingProfile": "5a4c08cd19d0a40d9c051653",
 *       "activityType": "5a4c019629015e0c8b9c1737",
 *       "timestamp": 234567
 *       "__v": 0
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
 *       "_id": "5a4fd2d5fb0f2f041278e510",
 *       "description": "Lockout",
 *       "importance": "MEDIUM",
 *       "__v": 0
 *     }
 */