var express = require('express');
var router = express.Router();
var AnalysisResult = require('../controllers/analysisResults');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/analysisResults  ListAnalysisResults
 * @apiName ListAnalysisResults
 * @apiDescription
 * Get a list of all analysis results for the requesting user's organization. The requesting user will not be able to request results outside of the organization. Can specify the start and end timestamp to look within.
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
 * Get the analysis results within the requesting user's organization given an id. Not implemented because no user should need to get individual analysis results (not useful by themselves).
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
 * Create a new analysis result within the requesting user's organization. The requesting user can only create an analysis result for themselves.
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
 * Update an existing analysis result within the requesting user's organization given an id. Not implemented because no user should be able to change analysis results (they should be immutable).
 *
 * @apiGroup AnalysisResults
 *  
 * @apiUse AnalysisResultRequestBody
 * @apiuse AnalysisResultSuccess
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, AnalysisResult.update);

/**
 * @api {delete} /api/analysisResults/:id  DeleteAnalysisResult
 * @apiName DeleteAnalysisResult
 * @apiDescription
 * Delete an existing analysis result within the requesting user's organization given an id. Not implemented because no user should be able to delete analysis results (for recordkeeping purposes).
 *
 * @apiGroup AnalysisResults
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, AnalysisResult.delete);

module.exports = router;