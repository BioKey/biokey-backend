var express = require('express');
var router = express.Router();
var AnalysisResult = require('../controllers/analysisResults');
const middleware = require('../services/middleware');

/**
 * @api {get} /api/analysisResults  ListAnalysisResults
 * @apiName ListAnalysisResults
 * @apiDescription
 * Get a list of all analysis results
 * 
 * @apiGroup AnalysisResults
 * 
 * @apiUse RequestHeaders
 * @apiUse RequestHeaders
 * @apiSuccess {Array} analysisResults List of analysis results.
 * @apiSuccess {Number} analysisResults.probability The probability attached to the result.
 * @apiSuccess {Number} analysisResults.timestamp The time that the analysis result was created.
 * @apiSuccess {TypingProfile} analysisResults.typingProfile The typing profile that submitted the analysis results.
 * 
 * @apiSuccessExample Response (example):
 *     HTTP/1.1 200 Success
 *     {
 *       "analysisResults": [
 *          {
 *              "_id": "5a4fd2d5fb0f2f041278e510",
 *              "probability": 0.6,
 *              "timestamp": 3456732435432,
 *              "typingProfile": "5a4c019629015e0c8b9c1737"
 *              "__v": 0
 *          }
 *        ]
 *      }
 * 
 * @apiUse AdminError
 */
router.get('/', middleware.requireAdmin, AnalysisResult.getAll);

/**
 * @api {get} /api/analysisResults/:id  GetAnalysisResults
 * @apiName GetAnalysisResults
 * @apiDescription
 * Get a specific analysis result.
 * 
 * @apiGroup AnalysisResults
 * @apiUse RequestHeaders
 * @apiUse RequestHeaders
 * @apiUse AnalysisResultSuccess
 * @apiUse AdminError
 */
router.get('/:id', middleware.requireAdmin, AnalysisResult.get)

/**
 * @api {post} /api/analysisResults  PostAnalysisResult
 * @apiName PostAnalysisResult
 * @apiDescription
 * Post a new analysis result.
 * 
 * @apiGroup AnalysisResults
 * 
 * @apiUse RequestHeaders
 * @apiParam {Object} analysisResult The analysis result being created.
 * @apiSuccess {Number} analysisResults.probability The probability attached to the result.
 * @apiSuccess {Number} analysisResults.timestamp The time that the analysis result was created.
 * @apiSuccess {TypingProfile} analysisResults.typingProfile The typing profile that submitted the analysis results.
 * @apiParamExample {json} Request-Example
 *     {  
 *       "analysisResult": {
 *          "probability": 0.6,
 *          "timestamp": 3456732435432,
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *        }
 *      }
 * @apiUse AnalysisResultSuccess
 * @apiUse UnauthorizedError
 */
router.post('/', middleware.requireAuth, AnalysisResult.post);

/**
 * @api {put} /api/analysisResults/:id  UpdateAnalysisResult
 * @apiName UpdateAnalysisResult
 * @apiDescription
 * Update a analysis result. Requires admin permissions.
 * 
 * @apiGroup AnalysisResults
 *
 * @apiUse RequestHeaders
 * @apiParam {Object} analysisResult The analysis result being updated.
 * @apiSuccess {Number} analysisResult.probability The probability attached to the result.
 * @apiSuccess {Number} analysisResult.timestamp The time that the analysis result was created.
 * @apiSuccess {TypingProfile} analysisResult.typingProfile The typing profile that submitted the analysis results.
 * @apiParamExample {json} Request-Example
 *     {  
 *       "analysisResult": {
 *          "probability": 0.6,
 *          "timestamp": 3456732435432,
 *          "typingProfile": "5a4c019629015e0c8b9c1737"
 *        }
 *      }
 * 
 * @apiUse AnalysisResultSuccess
 * @apiUse AdminError
 */
router.put('/:id', middleware.requireAdmin, AnalysisResult.update);

/**
 * @api {delete} /api/analysisResults/:id  DeleteAnalysisResult
 * @apiName DeleteAnalysisResult
 * @apiDescription
 * Delete a analysis result. Requires admin permissions.
 *
 * @apiGroup AnalysisResults
 *
 * @apiUse RequestHeaders
 * @apiUse AdminError
 */
router.delete('/:id', middleware.requireAdmin, AnalysisResult.delete);

module.exports = router;