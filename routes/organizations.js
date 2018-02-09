var express = require('express');
var router = express.Router();
var Organization = require('../controllers/organizations');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/organizations  ListOrganizations
 * @apiName ListOrganizations
 * @apiDescription
 * Get a list of all organizations
 * 
 * @apiGroup Organizations
 * 
 * @apiUse RequestHeaders
 * @apiSuccess {Array} organizations List of organizations
 * @apiSuccess {String} organizations._id UUID of the organization for the system.
 * @apiSuccess {String} organizations.name The organization's unique name.
 * @apiSuccess {Number} organizations.maxUsers The number of users that the organization may have.
 * @apiSuccess {[String]} organizations.challengeStrategies The authentication strategies that the organization accepts.
 * @apiSuccess {Number} organizations.defaultThreshold The certainty threshold for users' continuous authentication.
 * @apiSuccess {Number} organizations.__v Version code of the schema being used.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "name": "testOrganization",
 *              "maxUsers": "100",
 *              "challengeStrategies": "["Password", "Google Auth"]",
 *              "defaultThreshold": "100",
 *              "__v": 0
 *          }
 *     ]
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Organization.getAll);

/**
 * @api {get} /api/organizations/:id  GetOrganization
 * @apiName GetOrganization
 * @apiDescription
 * Get a specific organization.
 * 
 * @apiGroup Organizations
 * @apiUse RequestHeaders
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Organization.get)

/**
 * @api {post} /api/organizations  PostOrganization
 * @apiName PostOrganization
 * @apiDescription
 * Post a new organization.
 * 
 * @apiGroup Organizations
 * 
 * @apiUse RequestHeaders
 * @apiParam {String} name The new organization's unique name.
 * @apiParam {Number} maxUsers The number of users that the new organization may have.
 * @apiParam {[String]} challengeStrategies The authentication strategies that the new organization accepts.
 * @apiParam {Number} defaultThreshold The new organization's certainty threshold for users' continuous authentication.
 * @apiParamExample {json} Request-Example
 *     {
 *          "name": "testOrganization",
 *          "maxUsers": "100",
 *          "challengeStrategies": "["Password", "Google Auth"]",
 *          "defaultThreshold": "100"
 *     }
 * 
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, Organization.post);

/**
 * @api {put} /api/organizations/:id  UpdateOrganization
 * @apiName UpdateOrganization
 * @apiDescription
 * Update a organization.
 * 
 * @apiGroup Organizations
 * 
 * @apiUse RequestHeaders
 * @apiParam {String} name The organization's new unique name.
 * @apiParam {Number} maxUsers The new number of users that the organization may have.
 * @apiParam {[String]} challengeStrategies The new set of authentication strategies that the organization accepts.
 * @apiParam {Number} defaultThreshold The organization's new certainty threshold for users' continuous authentication.
 * @apiParamExample {json} Request-Example
 *     {
 *          "name": "testOrganization",
 *          "maxUsers": "100",
 *          "challengeStrategies": "["Password", "Google Auth"]",
 *          "defaultThreshold": "100"
 *     }
 * 
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Organization.update);

/**
 * @api {delete} /api/organizations/:id  DeleteOrganization
 * @apiName DeleteOrganization
 * @apiDescription
 * Delete a organization.
 * @apiGroup Organizations
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Organization.delete);

module.exports = router;