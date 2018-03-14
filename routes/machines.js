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
 * @apiUse RequestHeaders
 * @apiSuccess {Array} machines List of machines
 * @apiSuccess {String} machines._id UUID of the machine for the system.
 * @apiSuccess {String} machines.mac The machine's unique MAC address.
 * @apiSuccess {String} machines.organization The organization that the machine is assigned to.
 * @apiSuccess {Number} machines.__v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "machines": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "mac": "00:0a:95:9d:68:16",
 *              "organization": "5a4fd2d5fb0f2f041278e510"
 *          }
 *        ]
 *      }
 */
router.get('/', middleware.requireAdmin, Machine.getAll);

/**
 * @api {get} /api/machines/:id  GetMachine
 * @apiName GetMachine
 * @apiDescription
 * Get a specific machine.
 * 
 * @apiGroup Machines
 * @apiUse RequestHeaders
 * @apiUse MachineSuccess
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Machine.get)

/**
 * @api {post} /api/machines  PostMachine
 * @apiName PostMachine
 * @apiDescription
 * Post a new machine.
 * 
 * @apiGroup Machines
 * 
 * @apiUse RequestHeaders
 * @apiParam {Object} machine The machine being created
 * @apiParam {String} machine.mac The new machine's unique MAC address.
 * @apiParam {String} machine.organization The organization that the new machine is assigned to.
 * @apiParamExample {json} Request-Example
 *     {
 *       "machine": {
 *          "mac": "00:0a:95:9d:68:16",
 *          "organization": "5a4fd2d5fb0f2f041278e510"
 *        }
 *     }
 * 
 * @apiUse MachineSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, Machine.post);

/**
 * @api {put} /api/machines/:id  UpdateMachine
 * @apiName UpdateMachine
 * @apiDescription
 * Update a machine.
 * 
 * @apiGroup Machines
 * 
 * @apiUse RequestHeaders
 * @apiParam {Object} machine The machine being updated
 * @apiParam {String} machine.mac The machine's new unique MAC address.
 * @apiParam {String} machine.organization The organization that the machine is newly assigned to.
 * @apiParamExample {json} Request-Example
 *     {
 *       "machine": {
 *          "mac": "00:0a:95:9d:68:16",
 *          "organization": "5a4fd2d5fb0f2f041278e510"
 *        }
 *     }
 * 
 * @apiUse MachineSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Machine.update);

/**
 * @api {delete} /api/machines/:id  DeleteMachine
 * @apiName DeleteMachine
 * @apiDescription
 * Delete a machine.
 * @apiGroup Machines
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Machine.delete);

module.exports = router;