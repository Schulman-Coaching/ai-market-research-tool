// API Keys Configuration Template
// IMPORTANT: Copy this file to 'api-keys.js' and add your actual API keys

const API_KEYS = {
    // Replace with your actual Gemini API key from https://aistudio.google.com/app/apikey
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
    
    // Replace with your actual Perplexity API key from https://www.perplexity.ai/settings/api
    PERPLEXITY_API_KEY: 'YOUR_PERPLEXITY_API_KEY_HERE'
};

// Auto-populate API keys if they are configured
if (typeof window !== 'undefined') {
    // Set Gemini API key if configured
    if (API_KEYS.GEMINI_API_KEY && API_KEYS.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
        localStorage.setItem('gemini-api-key', API_KEYS.GEMINI_API_KEY);
    }
    
    // Set Perplexity API key if configured
    if (API_KEYS.PERPLEXITY_API_KEY && API_KEYS.PERPLEXITY_API_KEY !== 'YOUR_PERPLEXITY_API_KEY_HERE') {
        localStorage.setItem('perplexity-api-key', API_KEYS.PERPLEXITY_API_KEY);
    }
}