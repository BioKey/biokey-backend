var express = require('express');
var router = express.Router();
var Organization = require('../controllers/organizations');

const middleware = require('../services/middleware');

/**
 * @api {get} /api/organizations  ListOrganizations
 * @apiName ListOrganizations
 * @apiDescription
 * Get the requesting user's organization as no user should have access to details about all organizations.
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
 * Get the requesting user's organization as no user should have access to details about other organizations. The id parameter must match the requesting user's organization id.
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
 * Create a new organization. Not implemented because organizations are created by their founding user instead. 
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
 * Update an organization given an id. The id parameter must match the requesting user's organization id.
 * 
 * @apiGroup Organizations
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
 * Delete an organization given an id. The id parameter must match the requesting user's organization id. 
 *
 * @apiGroup Organizations
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, Organization.delete);

module.exports = router;