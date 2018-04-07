var express = require('express');
var router = express.Router();
var Machine = require('../controllers/machines');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/machines  ListMachines
 * @apiName ListMachines
 * @apiDescription
 * Get a list of all machines in the administrator's organization.
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachinesSuccess
 * @apiUse RequestHeaders
 */
router.get('/', middleware.requireAdmin, Machine.getAll);

/**
 * @api {get} /api/machines/:id  GetMachine
 * @apiName GetMachine
 * @apiDescription
 * This endpoint returns the object of a specific machine when provided its id. 
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
 * Creates a new machine for an already existing organization. 
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachineRequestBody
 * @apiUse MachineSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, Machine.post);

/**
 * @api {put} /api/machines/:id  UpdateMachine
 * @apiName UpdateMachine
 * @apiDescription
 * Update a machine an existing machine which is accessed via its id. If the machine does not exist, the endpoint outputs an error. 
 * 
 * @apiGroup Machines
 * 
 * @apiUse MachineRequestBody
 * @apiUse MachineSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Machine.update);

/**
 * @api {delete} /api/machines/:id  DeleteMachine
 * @apiName DeleteMachine
 * @apiDescription
 * Deletes an machine within an organization. Must provide the machine's id. If the machine does not exist, the endpoint outputs an error. 
 *
 * @apiGroup Machines
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Machine.delete);

module.exports = router;