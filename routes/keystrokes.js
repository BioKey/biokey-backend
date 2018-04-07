var express = require('express');
var router = express.Router();
var Keystroke = require('../controllers/keystrokes');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/keystrokes  ListKeystrokes
 * @apiName ListKeystrokes
 * @apiDescription
 * Get a list of all keystrokes from a specific organization
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
 * Get a specific keystroke when its id is provided.
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
 * Create a new keystroke. 
 * 
 * @apiGroup Keystrokes
 * 
 * @apiUse KeystrokeRequestBody
 * @apiUse KeystrokeSuccess
 * @apiUse UnauthorizedError
 * @apiUse AdminError
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
 * @apiUse KeystrokeRequestBody
 * @apiUse KeystrokeSuccess
 * @apiUse UnauthorizedError
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Keystroke.update);

/**
 * @api {delete} /api/keystrokes/:id  DeleteKeystroke
 * @apiName DeleteKeystroke
 * @apiDescription
 * Delete a keystroke. Requires admin permissions.
 *
 * @apiGroup Keystrokes
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Keystroke.delete);

module.exports = router;