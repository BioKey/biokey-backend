var express = require('express');
var router = express.Router();
var Keystroke = require('../controllers/keystrokes');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/keystrokes  ListKeystrokes
 * @apiName ListKeystrokes
 * @apiDescription
 * Get a list of all keystrokes for the requesting user's organization. The requesting user will not be able to request keystrokes outside of the organization. Not implemented for now because system currently blocks access from sensitive keystroke information.
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse KeystrokesSuccess
 * @apoUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Keystroke.getAll);

/**
 * @api {get} /api/keystrokes/:id  GetKeystroke
 * @apiName GetKeystroke
 * @apiDescription
 * Get the keystrokes within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse KeystrokeSuccess
 * @apoUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Keystroke.get)

/**
 * @api {post} /api/keystrokes  PostKeystroke
 * @apiName PostKeystroke
 * @apiDescription
 * Create new keystrokes within the requesting user's organization. The requesting user can only create a keystrokes for themselves.
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse KeystrokeRequestBody
 * @apiUse KeystrokeSuccess
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, Keystroke.post);

/**
 * @api {put} /api/keystrokes/:id  UpdateKeystroke
 * @apiName UpdateKeystroke
 * @apiDescription
 * Update an existing keystroke within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.
 * 
 * @apiGroup Keystrokes
 *
 * @apiUse KeystrokeRequestBody
 * @apiUse KeystrokeSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Keystroke.update);

/**
 * @api {delete} /api/keystrokes/:id  DeleteKeystroke
 * @apiName DeleteKeystroke
 * @apiDescription
 * Delete an existing analysis result within the requesting user's organization given an id. Not implemented for now because system currently blocks access from sensitive keystroke information.
 *
 * @apiGroup Keystrokes
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Keystroke.delete);

module.exports = router;