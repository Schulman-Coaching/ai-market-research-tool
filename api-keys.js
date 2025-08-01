// API Keys Configuration
// IMPORTANT: Keep this file secure and do not share it publicly

const API_KEYS = {
    // Your Gemini API key
    GEMINI_API_KEY: 'AIzaSyDySGZBwsObvjj50sJQRgrG_W5fXGXkTAo',
    
    // Your Perplexity API key
    PERPLEXITY_API_KEY: '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'
};

// Auto-populate API keys if they are configured
if (typeof window !== 'undefined') {
    // Always set the Gemini API key
    if (API_KEYS.GEMINI_API_KEY && API_KEYS.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
        localStorage.setItem('gemini-api-key', API_KEYS.GEMINI_API_KEY);
    }
    
    // Set Perplexity API key if configured
    if (API_KEYS.PERPLEXITY_API_KEY && API_KEYS.PERPLEXITY_API_KEY !== 'YOUR_PERPLEXITY_API_KEY_HERE') {
        localStorage.setItem('perplexity-api-key', API_KEYS.PERPLEXITY_API_KEY);
    }
}