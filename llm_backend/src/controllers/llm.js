//
// LLM Controller: Handles LLM Catalog, Category, Cost, Detail, and Search APIs
//

const llmDatabaseService = require('../services/llm_database');

/**
 * PUBLIC_INTERFACE
 * GET /llms
 * Return list of LLMs (optionally filtered by query)
 */
exports.getAllLLMs = (req, res) => {
  /**
   * Query params supported:
   * - search: string to search by (name/provider/features/usability/category)
   * - category: filter by single/multi category/tag (comma separated)
   * - provider: filter by provider
   */
  let catalog = llmDatabaseService.getLLMCatalog();
  const { search, category, provider } = req.query;

  if (search) {
    const s = search.toLowerCase();
    catalog = catalog.filter(
      llm =>
        llm.name.toLowerCase().includes(s) ||
        llm.provider.toLowerCase().includes(s) ||
        (llm.features && llm.features.join(',').toLowerCase().includes(s)) ||
        (llm.usability && llm.usability.join(',').toLowerCase().includes(s))
    );
  }
  if (category) {
    // Multiple categories separated by comma
    const cats = category.toLowerCase().split(',').map(c => c.trim());
    catalog = catalog.filter(
      llm =>
        llm.features &&
        Array.isArray(llm.features) &&
        cats.some(cat => llm.features.map(f => f.toLowerCase()).includes(cat))
    );
  }
  if (provider) {
    catalog = catalog.filter(
      llm => llm.provider && llm.provider.toLowerCase() === provider.toLowerCase()
    );
  }
  res.json(catalog);
};

/**
 * PUBLIC_INTERFACE
 * GET /llms/:id
 * Return details for a single LLM by ID.
 */
exports.getLLMById = (req, res) => {
  const { id } = req.params;
  const llm = llmDatabaseService.getLLMById(id);
  if (!llm) return res.status(404).json({ error: 'LLM not found' });
  res.json(llm);
};

/**
 * PUBLIC_INTERFACE
 * GET /categories
 * List all unique LLM categories/tags, and, if requested, include a 'ChatGPT models' dedicated section.
 * If the query param ?includeChatGpt=true is provided, returns {categories: [...], chatgpt: [...]}
 */
exports.getCategories = (req, res) => {
  // To avoid breaking old API, default returns classic array. Use ?includeChatGpt=true for composite response.
  if (req.query.includeChatGpt === 'true') {
    const composite = llmDatabaseService.getCategoriesComposite();
    res.json(composite);
  } else {
    const categories = llmDatabaseService.getCategories();
    res.json(categories);
  }
};

/**
 * PUBLIC_INTERFACE
 * GET /cost-comparison
 * Returns simple array of {id, name, provider, price, pricingModel} for table/chart use.
 */
exports.getCostComparison = (req, res) => {
  const data = llmDatabaseService.getCostComparisonData();
  res.json(data);
};
