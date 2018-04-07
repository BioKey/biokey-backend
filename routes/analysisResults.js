var express = require('express');
var router = express.Router();
var AnalysisResult = require('../controllers/analysisResults');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/analysisResults  ListAnalysisResults
 * @apiName ListAnalysisResults
 * @apiDescription
 * Get a list of all analysis results of a given specific id.
 * 
 * @apiGroup AnalysisResults
 * 
 * @apiuse AnalysisResultsSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, AnalysisResult.getAll);

/**
 * @api {get} /api/analysisResults/:id  GetAnalysisResults
 * @apiName GetAnalysisResults
 * @apiDescription
 * Get a specific analysis result when its id is provided
 * 
 * @apiGroup AnalysisResults
 *
 * @apiuse AnalysisResultSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, AnalysisResult.get)

/**
 * @api {post} /api/analysisResults  PostAnalysisResult
 * @apiName PostAnalysisResult
 * @apiDescription
 * Create a new analysis result and post it.
 * 
 * @apiGroup AnalysisResults
 * 
 * @apiUse AnalysisResultRequestBody
 * @apiuse AnalysisResultSuccess
 * @apiUse RequestHeaders
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, AnalysisResult.post);

/**
 * @api {put} /api/analysisResults/:id  UpdateAnalysisResult
 * @apiName UpdateAnalysisResult
 * @apiDescription
 * Update an existing analysis result. If the analysis result does not exist, the endpoint outputs an error. Requires admin permissions.
 *
 * @apiGroup AnalysisResults
 *  
 * @apiUse AnalysisResultRequestBody
 * @apiuse AnalysisResultSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, AnalysisResult.update);

/**
 * @api {delete} /api/analysisResults/:id  DeleteAnalysisResult
 * @apiName DeleteAnalysisResult
 * @apiDescription
 * Delete an analysis result. If the analysis result does not exist, the endpoint outputs an error. Requires admin permissions.
 *
 * @apiGroup AnalysisResults
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, AnalysisResult.delete);

module.exports = router;