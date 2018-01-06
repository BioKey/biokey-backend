var express = require('express');
var router = express.Router();
var Machine = require('../controllers/machines');

/**
 * @api {get} /api/machines  ListMachines
 * @apiName ListMachines
 * @apiDescription
 * Get a list of all machines
 * 
 * @apiGroup Machines
 * 
 * @apiSuccess {Array} machines List of machines
 * @apiSuccess {String} machines._id UUID of the machine for the system.
 * @apiSuccess {String} machines.mac The machine's unique MAC address.
 * @apiSuccess {String} machines.organization The organization that the machine is assigned to.
 * @apiSuccess {Number} machines.__v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "mac": "00:0a:95:9d:68:16",
 *              "organization": "testOrganization",
 *              "__v": 0
 *          }
 *     ]
 */
router.get('/', Machine.getAll);

/**
 * @api {get} /api/machines/:id  GetMachine
 * @apiName GetMachine
 * @apiDescription
 * Get a specific machine.
 * 
 * @apiGroup Machines
 * @apiUse MachineSuccess
 */
router.get('/:machine_id', Machine.get)

/**
 * @api {post} /api/machines  PostMachine
 * @apiName PostMachine
 * @apiDescription
 * Post a new machine.
 * 
 * @apiGroup Machines
 * 
 * @apiParam {String} mac The new machine's unique MAC address.
 * @apiParam {String} organization The organization that the new machine is assigned to.
 * @apiParamExample {json} Request-Example
 *     {
 *          "mac": "00:0a:95:9d:68:16",
 *          "organization": "testOrganization"
 *     }
 * 
 * @apiUse MachineSuccess
 */
router.post('/', Machine.post);

/**
 * @api {put} /api/machines/:id  UpdateMachine
 * @apiName UpdateMachine
 * @apiDescription
 * Update a machine.
 * 
 * @apiGroup Machines
 * 
 * @apiParam {String} mac The machine's new unique MAC address.
 * @apiParam {String} organization The organization that the machine is newly assigned to.
 * @apiParamExample {json} Request-Example
 *     {
 *          "mac": "00:0a:95:9d:68:16"
 *          "organization": "testOrganization"
 *     }
 * 
 * @apiUse MachineSuccess
 */
router.put('/:machine_id', Machine.update);

/**
 * @api {delete} /api/machines/:id  DeleteMachine
 * @apiName DeleteMachine
 * @apiDescription
 * Delete a machine.
 * @apiGroup Machines
 */
router.delete('/:machine_id', Machine.delete);

module.exports = router;