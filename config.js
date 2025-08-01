// Configuration file for AI Market Research Tool
const CONFIG = {
    // API Endpoints
    GEMINI_API_BASE: 'https://generativelanguage.googleapis.com/v1beta',
    PERPLEXITY_API_BASE: 'https://api.perplexity.ai',
    
    // Model configurations
    GEMINI_MODEL: 'gemini-pro',
    PERPLEXITY_MODEL: 'llama-3.1-sonar-large-128k-online',
    
    // Request parameters
    MAX_TOKENS: 4000,
    TEMPERATURE: 0.7,
    REQUEST_DELAY: 1000, // ms between Perplexity requests to avoid rate limiting
    
    // UI Configuration
    MAX_IDEAS_TO_EXTRACT: 5,
    PROGRESS_ANIMATION_DURATION: 300, // ms
    
    // Local storage keys
    STORAGE_KEYS: {
        GEMINI_API_KEY: 'gemini-api-key',
        PERPLEXITY_API_KEY: 'perplexity-api-key'
    },
    
    // Default prompts (can be customized)
    PROMPTS: {
        GEMINI_TEMPLATE: `Conduct comprehensive deep research on market opportunities for AI workflow automation in the {TOPIC} industry/domain. 

Focus specifically on:
1. Current market gaps and inefficiencies
2. Unmet needs that could be addressed with AI automation
3. Specific product opportunities and solutions
4. Technical challenges that create barriers to automation
5. Market size and viability for potential solutions

For each identified opportunity, provide:
- Clear description of the problem/gap
- Proposed AI-powered solution concept
- Target market and users
- Technical feasibility assessment
- Potential market impact

Structure your response with clear sections and highlight specific product ideas that could be developed as web-based platforms or tools. Be detailed and actionable in your analysis.`,

        EXTRACTION_TEMPLATE: `Analyze the following market research text and extract specific product ideas that could be developed as web-based platforms or tools. For each idea, provide a concise description that could be used as a prompt for prototype development.

Research Text:
{RESEARCH_TEXT}

Extract 3-5 of the most promising product ideas. For each idea, provide:
1. A clear, concise title
2. A detailed description suitable for prototype development
3. Key features and functionality

Format your response as a JSON array with objects containing 'title' and 'description' fields.`,

        PERPLEXITY_TEMPLATE: `Help me create a comprehensive web-based platform for the following concept:

Title: {TITLE}
Description: {DESCRIPTION}

Please provide:
1. Detailed technical specifications
2. User interface design recommendations
3. Core features and functionality
4. Technology stack suggestions
5. Implementation roadmap
6. Database schema if applicable
7. API design considerations
8. Security and scalability considerations

Focus on creating a practical, implementable solution that could be developed as a modern web application.`
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}