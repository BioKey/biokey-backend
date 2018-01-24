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
 * @apiSuccess {Array} keystrokes List of keystrokes
 * @apiSuccess {String} keystrokes._id UUID of the keystroke for the system.
 * @apiSuccess {String} keystrokes.character The key that was pressed/released.
 * @apiSuccess {Number} keystrokes.timestamp The time that the keystroke occurred.
 * @apiSuccess {String} keystrokes.upOrDown Specifies whether the key was pressed or released. One of {"U", "D"}
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
 *              "upOrDown": "D"
 *              "__v": 0
 *          }
 *     ]
 */
router.get('/', middleware.requireAuth, Keystroke.getAll);

/**
 * @api {get} /api/keystrokes/:id  GetKeystroke
 * @apiName GetKeystroke
 * @apiDescription
 * Get a specific keystroke.
 * 
 * @apiGroup Keystrokes
 * @apiUse KeystrokeSuccess
 */
router.get('/:keystroke_id', middleware.requireAuth, Keystroke.get)

/**
 * @api {post} /api/keystrokes  PostKeystroke
 * @apiName PostKeystroke
 * @apiDescription
 * Post a new keystroke.
 * 
 * @apiGroup Keystrokes
 * 
 * @apiParam {String} character The key that was newly pressed/released.
 * @apiParam {Number} timestamp The time that the new keystroke occurred.
 * @apiParam {String} upOrDown Specifies whether the key was pressed or released. One of {"U", "D"}
 * @apiParam {TypingProfile} typingProfile The typing profile that submitted the new keystoke.
 * @apiParamExample {json} Request-Example
 *     {
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "upOrDown": "D"
 *     }
 * 
 * @apiUse KeystrokeSuccess
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
 * @apiParam {String} character The new key that was pressed/released.
 * @apiParam {Number} timestamp The new time that the keystroke occurred.
 * @apiParam {String} upOrDown The new direction of the keystroke. One of {"U", "D"}
 * @apiParam {TypingProfile} typingProfile The updated typing profile that submitted the keystoke.
 * @apiParamExample {json} Request-Example
 *     {
 *          "character": "R",
 *          "timestamp": 3456732435432,
 *          "upOrDown": "D"
 *     }
 * 
 * @apiHeader authorization The access token associated with the typing profile's session.
 * 
 * @apiUse KeystrokeSuccess
 */
router.put('/:keystroke_id', middleware.requireAdmin, Keystroke.update);

/**
 * @api {delete} /api/keystrokes/:id  DeleteKeystroke
 * @apiName DeleteKeystroke
 * @apiDescription
 * Delete a keystroke. Requires admin permissions.
 * @apiGroup Keystrokes
 * @apiHeader authorization The access token associated with the typing profile's session.
 */
router.delete('/:keystroke_id', middleware.requireAdmin, Keystroke.delete);

module.exports = router;