var express = require('express');
var router = express.Router();
var Organization = require('../controllers/organizations');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/organizations  ListOrganizations
 * @apiName ListOrganizations
 * @apiDescription
 * Get the details of the organization of the requesting user. Does not return all the existing organizations because that wouldn't make sense. 
 * 
 * @apiGroup Organizations
 * 
 * @apiUse RequestHeaders
 * @apiUse OrganizationsSuccess
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, Organization.getAll);

/**
 * @api {get} /api/organizations/:id  GetOrganization
 * @apiName GetOrganization
 * @apiDescription
 * Get a specific organization when providing its id. This doesn't make sense, however, since organizations are created with the founding user. 
 * 
 * @apiGroup Organizations
 *
 * @apiUse RequestHeaders
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, Organization.get)

/**
 * @api {post} /api/organizations  PostOrganization
 * @apiName PostOrganization
 * @apiDescription
 * This allows the user to create a new organization 
 * 
 * @apiGroup Organizations
 * 
 * @apiUse RequestHeaders
 * @apiUse OrganizationRequestBody
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.post('/', middleware.requireAdmin, Organization.post);

/**
 * @api {put} /api/organizations/:id  UpdateOrganization
 * @apiName UpdateOrganization
 * @apiDescription
 * Update the details of a specific organization given its id. 
 * 
 * @apiGroup Organizations
 * 
 * 
 * @apiUse RequestHeaders
 * @apiUse OrganizationRequestBody
 * @apiUse OrganizationSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, Organization.update);

/**
 * @api {delete} /api/organizations/:id  DeleteOrganization
 * @apiName DeleteOrganization
 * @apiDescription
 * Delete a specific organization. If the organization does not exist, the endpoint will output an error. 
 *
 * @apiGroup Organizations
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Organization.delete);

module.exports = router;