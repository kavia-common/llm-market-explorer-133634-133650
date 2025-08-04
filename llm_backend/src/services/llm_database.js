//
// llm_database.js - Data access stub for LLM catalog, categories, and costs
// Provides an in-memory mock data model for LLMs to enable backend development.
// Replace or extend with actual DB integration/adapters as needed.
//

/**
 * PUBLIC_INTERFACE
 * Returns mock LLM catalog data (list of LLMs with core fields).
 * @returns {Array<Object>} Array of LLM model objects
 */
function getLLMCatalog() {
  // We will enhance this by marking GPT-style models for special section extraction.
  return [
    {
      id: 'llm-1',
      name: 'OpenAI GPT-4',
      provider: 'OpenAI',
      features: ['context-8k', 'cloud', 'api', 'fine-tuning', 'chatgpt'], // <-- add "chatgpt" tag for demo
      usability: ['easy integration', 'good docs'],
      cost: { pricingModel: 'per 1K tokens', price: 0.06, currency: 'USD' },
      documentation_url: 'https://platform.openai.com/docs/guides/gpt',
      type: 'chatgpt' // add explicit type for clear logic (could also deduce via features/provider)
    },
    {
      id: 'llm-2',
      name: 'Anthropic Claude 2',
      provider: 'Anthropic',
      features: ['context-100k', 'cloud', 'api', 'chat-optimization'],
      usability: ['fine control', 'clear api'],
      cost: { pricingModel: 'per 1M tokens', price: 8.00, currency: 'USD' },
      documentation_url: 'https://docs.anthropic.com/claude'
    }
    // Add more mocks as required, real system would query DB
  ];
}

/**
 * Get ChatGPT models for a dedicated sidebar section.
 * Returns a list of LLMs classified as ChatGPT models.
 * @returns {Array<Object>}
 */
function getChatGptModels() {
  return getLLMCatalog().filter(
    (llm) =>
      // Mark as "ChatGPT" family if explicit type, or name/provider detection, or "chatgpt" feature
      (llm.type && llm.type.toLowerCase().includes('chatgpt')) ||
      (llm.features && Array.isArray(llm.features) && llm.features.map(f=>f.toLowerCase()).includes('chatgpt')) ||
      (llm.name && llm.name.toLowerCase().includes('gpt')) // Expand logic as needed
  );
}

/**
 * PUBLIC_INTERFACE
 * Returns the list of unique categories used to tag/categorize LLMs.
 * Enhanced: Also returns { categories: [...], chatgpt: [...] }
 * @returns {{categories: Array<string>, chatgpt: Array<Object>}}
 */
function getCategoriesComposite() {
  // The regular categories list
  const categories = ['cloud', 'on-premise', 'open-source', 'api', 'fine-tuning', 'chat-optimization', 'chatgpt'];
  // The dedicated list of ChatGPT models
  const chatgptModels = getChatGptModels();
  return {
    categories,
    chatgpt: chatgptModels
  };
}

/**
 * PUBLIC_INTERFACE
 * Original for categories, deprecated but kept for backward compatibility.
 * @returns {Array<string>}
 */
function getCategories() {
  return ['cloud', 'on-premise', 'open-source', 'api', 'fine-tuning', 'chat-optimization', 'chatgpt'];
}

/**
 * PUBLIC_INTERFACE
 * Returns (mock) cost comparison data suitable for tables/charts.
 * @returns {Array<Object>} Array of {id, name, price, pricingModel, provider}
 */
function getCostComparisonData() {
  return getLLMCatalog().map(llm => ({
    id: llm.id,
    name: llm.name,
    provider: llm.provider,
    price: llm.cost.price,
    pricingModel: llm.cost.pricingModel
  }));
}

/**
 * PUBLIC_INTERFACE
 * Retrieves an LLM by ID (for model detail view).
 * @param {string} llmId
 * @returns {Object|null}
 */
function getLLMById(llmId) {
  return getLLMCatalog().find(llm => llm.id === llmId) || null;
}

module.exports = {
  getLLMCatalog,
  getCategories,
  getCostComparisonData,
  getLLMById
};
