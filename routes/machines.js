var express = require('express');
var router = express.Router();
var Machine = require('../controllers/machines');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/machines  ListMachines
 * @apiName ListMachines
 * @apiDescription
 * Get a list of all machines for the requesting user's organization. The requesting user will not be able to request machines outside of the organization. Can specify the limit, page, and sort for pagination.
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachinesSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Machine.getAll);

/**
 * @api {get} /api/machines/:id  GetMachine
 * @apiName GetMachine
 * @apiDescription
 * Get the machine within the requesting user's organization given an id.
 * 
 * @apiGroup Machines
 *
 * @apiUse MachineSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Machine.get)

/**
 * @api {post} /api/machines  PostMachine
 * @apiName PostMachine
 * @apiDescription
 * Create a new machine within the requesting user's organization.
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachineRequestBody
 * @apiUse MachineSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, Machine.post);

/**
 * @api {put} /api/machines/:id  UpdateMachine
 * @apiName UpdateMachine
 * @apiDescription
 * Update an existing analysis result within the requesting user's organization given an id.
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachineRequestBody
 * @apiUse MachineSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Machine.update);

/**
 * @api {delete} /api/machines/:id  DeleteMachine
 * @apiName DeleteMachine
 * @apiDescription
 * Delete an existing analysis result within the requesting user's organization given an id.
 *
 * @apiGroup Machines
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Machine.delete);

module.exports = router;