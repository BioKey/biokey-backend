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