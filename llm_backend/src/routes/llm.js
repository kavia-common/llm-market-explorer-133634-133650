const express = require('express');
const controller = require('../controllers/llm');

/**
 * @swagger
 * tags:
 *   - name: LLM Catalog
 *     description: List, filter, and search LLMs
 *   - name: Categories
 *     description: LLM Categories/tags API
 *   - name: Cost Comparison
 *     description: Cost comparison API
 */

const router = express.Router();

/**
 * @swagger
 * /llms:
 *   get:
 *     summary: Get the list of all LLMs (with search/filter)
 *     tags: [LLM Catalog]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search string (name, provider, features)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category/tag (comma-separated)
 *       - in: query
 *         name: provider
 *         schema:
 *           type: string
 *         description: Filter by provider name
 *     responses:
 *       200:
 *         description: List of LLMs
 */
router.get('/llms', controller.getAllLLMs);

/**
 * @swagger
 * /llms/{id}:
 *   get:
 *     summary: Get details of a single LLM by ID
 *     tags: [LLM Catalog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: LLM ID
 *     responses:
 *       200:
 *         description: LLM details
 *       404:
 *         description: Not found
 */
router.get('/llms/:id', controller.getLLMById);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all LLM categories/tags
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories/tags
 */
router.get('/categories', controller.getCategories);

/**
 * @swagger
 * /cost-comparison:
 *   get:
 *     summary: Get cost comparison data for models
 *     tags: [Cost Comparison]
 *     responses:
 *       200:
 *         description: Cost comparison table/chart data
 */
router.get('/cost-comparison', controller.getCostComparison);

module.exports = router;
