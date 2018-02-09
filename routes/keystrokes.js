var express = require('express');
var router = express.Router();
var Keystroke = require('../controllers/keystrokes');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/keystrokes  ListKeystrokes
 * @apiName ListKeystrokes
 * @apiDescription
 * Get a list of all keystrokes
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse RequestHeaders
 * @apiUse RequestHeaders
 * @apiSuccess {Array} keystrokes List of keystrokes
 * @apiSuccess {String} keystrokes._id UUID of the keystroke for the system.
 * @apiSuccess {String} keystrokes.character The key that was pressed/released.
 * @apiSuccess {Number} keystrokes.timestamp The time that the keystroke occurred.
 * @apiSuccess {Boolean} keystrokes.keyDown Specifies whether the key was pressed or released.
 * @apiSuccess {TypingProfile} typingProfile The typing profile that submitted the keystoke.
 * @apiSuccess {Number} keystrokes.__v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "character": "R",
 *              "timestamp": 3456732435432,
 *              "keyDown": false,
 *              "typingProfile": "5a4c019629015e0c8b9c1737"
 *              "__v": 0
 *          }
 *     ]
 * 
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Keystroke.getAll);

/**
 * @api {get} /api/keystrokes/:id  GetKeystroke
 * @apiName GetKeystroke
 * @apiDescription
 * Get a specific keystroke.
 * 
 * @apiGroup Keystrokes
 * @apiUse RequestHeaders
 * @apiUse RequestHeaders
 * @apiUse KeystrokeSuccess
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Keystroke.get)

/**
 * @api {post} /api/keystrokes  PostKeystroke
 * @apiName PostKeystroke
 * @apiDescription
 * Post a new keystroke.
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse RequestHeaders
 * @apiParam {String} character The key that was newly pressed/released.
 * @apiParam {Number} timestamp The time that the new keystroke occurred.
 * @apiParam {Boolean} keyDown Specifies whether the key was pressed or released.
 * @apiParam {TypingProfile} typingProfile The typing profile that submitted the new keystoke.
 * @apiParamExample {json} Request-Example
 *     {
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "keyDown": false
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *     }
 * 
 * @apiUse KeystrokeSuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, Keystroke.post);

/**
 * @api {put} /api/keystrokes/:id  UpdateKeystroke
 * @apiName UpdateKeystroke
 * @apiDescription
 * Update a keystroke. Requires admin permissions.
 * 
 * @apiGroup Keystrokes
 *
 * @apiUse RequestHeaders
 * @apiParam {String} character The new key that was pressed/released.
 * @apiParam {Number} timestamp The new time that the keystroke occurred.
 * @apiParam {Boolean} keyDown The new direction of the keystroke.
 * @apiParam {TypingProfile} typingProfile The updated typing profile that submitted the keystoke.
 * @apiParamExample {json} Request-Example
 *     {
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "keyDown": true
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *     }
 * 
 * @apiUse KeystrokeSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Keystroke.update);

/**
 * @api {delete} /api/keystrokes/:id  DeleteKeystroke
 * @apiName DeleteKeystroke
 * @apiDescription
 * Delete a keystroke. Requires admin permissions.
 * @apiGroup Keystrokes
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Keystroke.delete);

module.exports = router;