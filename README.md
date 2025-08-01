# AI Market Research & Prototype Generator

## ✅ **STATUS: FULLY FUNCTIONAL**
**Latest Update**: Successfully resolved Perplexity API integration! The complete end-to-end workflow is now working perfectly with the `sonar` model.

A powerful web-based tool that automates the process of conducting market research and generating product prototypes using AI. Enter any topic, and the tool will:

1. **Generate comprehensive market research** using Google's Gemini AI
2. **Extract product opportunities** from the research using intelligent text analysis
3. **Create detailed prototypes** for each opportunity using Perplexity Labs
4. **Export results** in markdown format for further use

## Features

### 🔍 **Intelligent Market Research**
- Uses Gemini AI to conduct deep market analysis
- Focuses on AI workflow automation opportunities
- Identifies gaps, unmet needs, and technical challenges
- Provides actionable insights and market viability assessments

### 🧠 **Smart Product Extraction**
- AI-powered analysis of research results
- Automatically identifies 3-5 promising product concepts
- Extracts clear, actionable product descriptions
- Handles various text formats and structures

### 🚀 **Automated Prototype Generation**
- Sequential processing of all extracted ideas
- Detailed technical specifications for each concept
- UI/UX design recommendations
- Technology stack suggestions and implementation roadmaps

### 📊 **Professional Results Display**
- Clean, organized presentation of research and prototypes
- Real-time progress tracking with visual indicators
- Export functionality for individual or bulk results
- Responsive design that works on all devices

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Gemini API key from Google AI Studio
- Perplexity Labs API key

### Installation

1. **Clone or download** this project to your local machine
2. **Open `index.html`** in your web browser
3. **Enter your API keys** when prompted (they'll be securely stored locally)
4. **Start researching!**

### API Key Setup

#### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key for use in the tool

#### Perplexity Labs API Key
1. Visit [Perplexity Labs](https://www.perplexity.ai/settings/api)
2. Sign up or log in to your account
3. Generate an API key
4. Copy the key for use in the tool

## How to Use

### Step 1: Enter Your Topic
Type any topic related to business, technology, or industry domains. Examples:
- "partnership tax compliance"
- "healthcare workflow automation" 
- "legal document processing"
- "financial services automation"
- "supply chain management"

### Step 2: Watch the Magic Happen
The tool automatically:
1. **Conducts Research** - Gemini analyzes your topic for market opportunities
2. **Extracts Ideas** - AI identifies specific product concepts from the research
3. **Generates Prototypes** - Perplexity creates detailed specifications for each idea
4. **Displays Results** - Everything is organized and ready for export

### Step 3: Export Your Results
- **Export Research** - Download the complete market analysis
- **Export Prototypes** - Get all prototype specifications in one file
- **Export Individual** - Download specific prototypes separately

## File Structure

```
AI-Market-Research-Tool/
├── index.html          # Main application interface
├── app.js              # Core application logic and API integrations
├── config.js           # Configuration settings and templates
└── README.md           # This documentation file
```

## Technical Details

### Architecture
- **Frontend**: Pure HTML/CSS/JavaScript with Tailwind CSS
- **APIs**: Google Gemini AI and Perplexity Labs
- **Storage**: Local browser storage for API keys
- **Export**: Client-side file generation

### Key Components

#### AIMarketResearchTool Class
The main application class that handles:
- API key management and storage
- Workflow orchestration
- Progress tracking and UI updates
- Result formatting and export

#### API Integrations
- **Gemini API**: Market research generation
- **Perplexity API**: Prototype specification creation
- Error handling and rate limiting
- Secure key storage

#### User Interface
- Responsive design with Tailwind CSS
- Real-time progress indicators
- Modal dialogs for API configuration
- Export functionality with file downloads

## Customization

### Modifying Prompts
Edit the `PROMPTS` section in `config.js` to customize:
- Research focus areas
- Extraction criteria
- Prototype specification requirements

### Adjusting Parameters
Modify `config.js` to change:
- API endpoints and models
- Request parameters (temperature, max tokens)
- UI settings and delays
- Storage configurations

## Troubleshooting

### Common Issues

**"API Error" Messages**
- Verify your API keys are correct
- Check your internet connection
- Ensure you have sufficient API credits

**"No Ideas Extracted"**
- Try a more specific topic
- Check if the research results contain clear product opportunities
- The extraction uses fallback parsing if JSON parsing fails

**Slow Performance**
- Large topics may take longer to process
- Perplexity requests are rate-limited (1 second delay between calls)
- Complex research may require more processing time

### Browser Compatibility
- Requires modern browser with ES6+ support
- Uses Fetch API for HTTP requests
- Local storage for API key persistence

## Security Notes

- API keys are stored locally in your browser only
- No data is sent to external servers except the AI APIs
- All processing happens client-side
- Clear browser data to remove stored API keys

## Future Enhancements

Potential improvements for future versions:
- Batch processing of multiple topics
- Custom prompt templates
- Integration with additional AI services
- Advanced filtering and categorization
- Team collaboration features
- Cloud storage integration

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify your API keys and internet connection
3. Try refreshing the page or clearing browser cache
4. Review browser console for detailed error messages

## License

This tool is provided as-is for internal use. Ensure compliance with the terms of service for Gemini AI and Perplexity Labs APIs.

---

**Built with ❤️ for efficient AI-powered market research and rapid prototyping.**