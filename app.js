class AIMarketResearchTool {
    constructor() {
        this.geminiApiKey = '';
        this.perplexityApiKey = '';
        this.currentTopic = '';
        this.researchResults = '';
        this.extractedIdeas = [];
        this.prototypeResults = [];
        
        this.initializeEventListeners();
        this.checkApiKeys();
    }

    initializeEventListeners() {
        // Main research button
        document.getElementById('start-research').addEventListener('click', () => {
            this.startResearchProcess();
        });

        // API modal buttons
        document.getElementById('save-api-keys').addEventListener('click', () => {
            this.saveApiKeys();
        });

        document.getElementById('cancel-api-modal').addEventListener('click', () => {
            this.hideApiModal();
        });

        // Export buttons
        document.getElementById('export-research').addEventListener('click', () => {
            this.exportResearch();
        });

        document.getElementById('export-prototypes').addEventListener('click', () => {
            this.exportPrototypes();
        });

        // Enter key support for topic input
        document.getElementById('topic-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.startResearchProcess();
            }
        });
    }

    checkApiKeys() {
        // Check if API keys are stored in localStorage
        const storedGeminiKey = localStorage.getItem('gemini-api-key');
        const storedPerplexityKey = localStorage.getItem('perplexity-api-key');
        
        if (storedGeminiKey && storedPerplexityKey) {
            this.geminiApiKey = storedGeminiKey;
            this.perplexityApiKey = storedPerplexityKey;
        }
    }

    showApiModal() {
        document.getElementById('api-modal').classList.remove('hidden');
        // Pre-fill with stored keys if available
        document.getElementById('gemini-api-key').value = this.geminiApiKey;
        document.getElementById('perplexity-api-key').value = this.perplexityApiKey;
    }

    hideApiModal() {
        document.getElementById('api-modal').classList.add('hidden');
    }

    saveApiKeys() {
        const geminiKey = document.getElementById('gemini-api-key').value.trim();
        const perplexityKey = document.getElementById('perplexity-api-key').value.trim();

        if (!geminiKey || !perplexityKey) {
            alert('Please enter both API keys');
            return;
        }

        this.geminiApiKey = geminiKey;
        this.perplexityApiKey = perplexityKey;

        // Store in localStorage for future use
        localStorage.setItem('gemini-api-key', geminiKey);
        localStorage.setItem('perplexity-api-key', perplexityKey);

        this.hideApiModal();
        this.executeResearchWorkflow();
    }

    async startResearchProcess() {
        const topicInput = document.getElementById('topic-input');
        const topic = topicInput.value.trim();

        if (!topic) {
            alert('Please enter a research topic');
            return;
        }

        this.currentTopic = topic;

        // Check if we have API keys
        if (!this.geminiApiKey || !this.perplexityApiKey) {
            this.showApiModal();
            return;
        }

        await this.executeResearchWorkflow();
    }

    async executeResearchWorkflow() {
        try {
            // Show progress section
            document.getElementById('progress-section').classList.remove('hidden');
            document.getElementById('results-section').classList.add('hidden');
            
            // Disable the start button
            const startButton = document.getElementById('start-research');
            startButton.disabled = true;
            startButton.textContent = 'Processing...';

            // Step 1: Gemini Research
            await this.performGeminiResearch();

            // Step 2: Extract Ideas
            await this.extractProductIdeas();

            // Step 3: Generate Prototypes
            await this.generatePrototypes();

            // Step 4: Complete
            this.completeWorkflow();

        } catch (error) {
            console.error('Workflow error:', error);
            this.handleError(error);
        }
    }

    updateProgressStep(stepNumber, status = 'active') {
        const steps = document.querySelectorAll('.progress-step');
        const currentStep = steps[stepNumber - 1];
        
        if (status === 'active') {
            currentStep.classList.remove('bg-gray-200', 'text-gray-600');
            currentStep.classList.add('active');
        } else if (status === 'completed') {
            currentStep.classList.remove('active', 'bg-gray-200', 'text-gray-600');
            currentStep.classList.add('completed');
        }
    }

    updateStatus(message) {
        document.getElementById('current-status').innerHTML = `
            <div class="loader mx-auto mb-4"></div>
            <p class="text-gray-600">${message}</p>
        `;
    }

    async performGeminiResearch() {
        this.updateProgressStep(1, 'active');
        this.updateStatus('Conducting deep market research with Gemini...');

        const prompt = this.createGeminiPrompt(this.currentTopic);
        
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            this.researchResults = data.candidates[0].content.parts[0].text;
            
            this.updateProgressStep(1, 'completed');
            this.displayResearchResults();
            
        } catch (error) {
            throw new Error(`Gemini research failed: ${error.message}`);
        }
    }

    createGeminiPrompt(topic) {
        return `Conduct comprehensive deep research on market opportunities for AI workflow automation in the ${topic} industry/domain. 

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

Structure your response with clear sections and highlight specific product ideas that could be developed as web-based platforms or tools. Be detailed and actionable in your analysis.`;
    }

    async extractProductIdeas() {
        this.updateProgressStep(2, 'active');
        this.updateStatus('Analyzing research to extract product ideas...');

        const extractionPrompt = `Analyze the following market research text and extract specific product ideas that could be developed as web-based platforms or tools. For each idea, provide a concise description that could be used as a prompt for prototype development.

Research Text:
${this.researchResults}

Extract 3-5 of the most promising product ideas. For each idea, provide:
1. A clear, concise title
2. A detailed description suitable for prototype development
3. Key features and functionality

Format your response as a JSON array with objects containing 'title' and 'description' fields.`;

        try {
            // Use Gemini for extraction as well
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: extractionPrompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini extraction error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const extractionText = data.candidates[0].content.parts[0].text;
            
            // Parse the JSON response
            try {
                // Extract JSON from the response (it might be wrapped in markdown)
                const jsonMatch = extractionText.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    this.extractedIdeas = JSON.parse(jsonMatch[0]);
                } else {
                    // Fallback: create ideas from the text
                    this.extractedIdeas = this.parseIdeasFromText(extractionText);
                }
            } catch (parseError) {
                // Fallback parsing
                this.extractedIdeas = this.parseIdeasFromText(extractionText);
            }

            this.updateProgressStep(2, 'completed');
            this.displayExtractedIdeas();
            
        } catch (error) {
            throw new Error(`Idea extraction failed: ${error.message}`);
        }
    }

    parseIdeasFromText(text) {
        // Fallback method to extract ideas from text
        const ideas = [];
        const lines = text.split('\n');
        let currentIdea = null;

        for (const line of lines) {
            if (line.includes('Title:') || line.includes('title:') || line.match(/^\d+\./)) {
                if (currentIdea) {
                    ideas.push(currentIdea);
                }
                currentIdea = {
                    title: line.replace(/^\d+\.|\*|Title:|title:/gi, '').trim(),
                    description: ''
                };
            } else if (currentIdea && line.trim()) {
                currentIdea.description += line.trim() + ' ';
            }
        }

        if (currentIdea) {
            ideas.push(currentIdea);
        }

        return ideas.slice(0, 5); // Limit to 5 ideas
    }

    async generatePrototypes() {
        this.updateProgressStep(3, 'active');
        this.updateStatus('Generating prototypes with Perplexity Labs...');

        this.prototypeResults = [];

        for (let i = 0; i < this.extractedIdeas.length; i++) {
            const idea = this.extractedIdeas[i];
            this.updateStatus(`Generating prototype ${i + 1} of ${this.extractedIdeas.length}: ${idea.title}`);

            try {
                const prototypePrompt = this.createPerplexityPrompt(idea);
                const response = await this.callPerplexityAPI(prototypePrompt);
                
                this.prototypeResults.push({
                    idea: idea,
                    prototype: response
                });

                // Add a small delay between requests to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                console.error(`Error generating prototype for "${idea.title}":`, error);
                this.prototypeResults.push({
                    idea: idea,
                    prototype: `Error generating prototype: ${error.message}`
                });
            }
        }

        this.updateProgressStep(3, 'completed');
        this.displayPrototypeResults();
    }

    createPerplexityPrompt(idea) {
        return `Help me create a comprehensive web-based platform for the following concept:

Title: ${idea.title}
Description: ${idea.description}

Please provide:
1. Detailed technical specifications
2. User interface design recommendations
3. Core features and functionality
4. Technology stack suggestions
5. Implementation roadmap
6. Database schema if applicable
7. API design considerations
8. Security and scalability considerations

Focus on creating a practical, implementable solution that could be developed as a modern web application.`;
    }

    async callPerplexityAPI(prompt) {
        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.perplexityApiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'sonar',
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 1000,
                    temperature: 0.2
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Perplexity API Error Response:', errorText);
                throw new Error(`Perplexity API error: ${response.status} ${response.statusText} - ${errorText}`);
            }

            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            throw new Error(`Perplexity API call failed: ${error.message}`);
        }
    }

    completeWorkflow() {
        this.updateProgressStep(4, 'completed');
        document.getElementById('current-status').innerHTML = `
            <div class="text-green-600 text-center">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p class="text-lg font-semibold">Research and prototype generation complete!</p>
                <p class="text-sm text-gray-600 mt-2">Generated ${this.extractedIdeas.length} product ideas and ${this.prototypeResults.length} prototypes</p>
            </div>
        `;

        // Re-enable the start button
        const startButton = document.getElementById('start-research');
        startButton.disabled = false;
        startButton.textContent = 'Start New Research';

        // Show results section
        document.getElementById('results-section').classList.remove('hidden');
    }

    displayResearchResults() {
        const researchContent = document.getElementById('research-content');
        // Convert markdown-like formatting to HTML
        const formattedContent = this.formatTextToHTML(this.researchResults);
        researchContent.innerHTML = formattedContent;
    }

    displayExtractedIdeas() {
        const ideasSection = document.getElementById('extracted-ideas');
        const ideasList = document.getElementById('ideas-list');
        
        ideasList.innerHTML = '';
        
        this.extractedIdeas.forEach((idea, index) => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'bg-blue-50 border border-blue-200 rounded-lg p-4';
            ideaCard.innerHTML = `
                <h3 class="font-semibold text-blue-800 mb-2">${idea.title}</h3>
                <p class="text-blue-700 text-sm">${idea.description}</p>
            `;
            ideasList.appendChild(ideaCard);
        });
        
        ideasSection.classList.remove('hidden');
    }

    displayPrototypeResults() {
        const prototypesContainer = document.getElementById('prototypes-container');
        prototypesContainer.innerHTML = '';

        this.prototypeResults.forEach((result, index) => {
            const prototypeCard = document.createElement('div');
            prototypeCard.className = 'prototype-card bg-green-50 border border-green-200 rounded-lg p-6';
            
            const formattedPrototype = this.formatTextToHTML(result.prototype);
            
            prototypeCard.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-semibold text-green-800">${result.idea.title}</h3>
                    <button onclick="aiTool.exportSinglePrototype(${index})" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition duration-200">
                        Export
                    </button>
                </div>
                <div class="text-green-700 mb-4 text-sm bg-green-100 p-3 rounded">
                    <strong>Original Idea:</strong> ${result.idea.description}
                </div>
                <div class="prose prose-green max-w-none">
                    ${formattedPrototype}
                </div>
            `;
            
            prototypesContainer.appendChild(prototypeCard);
        });
    }

    formatTextToHTML(text) {
        // Convert markdown-like formatting to HTML
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mt-8 mb-4">$1</h2>')
            .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-10 mb-6">$1</h1>')
            .replace(/^\- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-4">$1</ul>')
            .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/^(?!<[h|u|l])/gm, '<p class="mb-4">')
            .replace(/<p class="mb-4">(<[h|u])/g, '$1')
            .replace(/(<\/[h|u|l][^>]*>)<\/p>/g, '$1');
    }

    exportResearch() {
        const content = `# Market Research Results\n\nTopic: ${this.currentTopic}\n\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n${this.researchResults}`;
        this.downloadFile(`market-research-${this.currentTopic.replace(/\s+/g, '-')}.md`, content);
    }

    exportPrototypes() {
        let content = `# AI-Generated Prototypes\n\nTopic: ${this.currentTopic}\nGenerated: ${new Date().toLocaleString()}\n\n---\n\n`;
        
        this.prototypeResults.forEach((result, index) => {
            content += `## Prototype ${index + 1}: ${result.idea.title}\n\n`;
            content += `**Original Idea:** ${result.idea.description}\n\n`;
            content += `**Prototype Specifications:**\n\n${result.prototype}\n\n---\n\n`;
        });
        
        this.downloadFile(`prototypes-${this.currentTopic.replace(/\s+/g, '-')}.md`, content);
    }

    exportSinglePrototype(index) {
        const result = this.prototypeResults[index];
        const content = `# ${result.idea.title}\n\nGenerated: ${new Date().toLocaleString()}\n\n## Original Idea\n\n${result.idea.description}\n\n## Prototype Specifications\n\n${result.prototype}`;
        this.downloadFile(`prototype-${result.idea.title.replace(/\s+/g, '-')}.md`, content);
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    handleError(error) {
        console.error('Application error:', error);
        
        document.getElementById('current-status').innerHTML = `
            <div class="text-red-600 text-center">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-lg font-semibold">An error occurred</p>
                <p class="text-sm text-gray-600 mt-2">${error.message}</p>
                <button onclick="location.reload()" class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200">
                    Restart Tool
                </button>
            </div>
        `;

        // Re-enable the start button
        const startButton = document.getElementById('start-research');
        startButton.disabled = false;
        startButton.textContent = 'Start AI Research & Prototype Generation';
    }
}

// Initialize the application when the page loads
let aiTool;
document.addEventListener('DOMContentLoaded', () => {
    aiTool = new AIMarketResearchTool();
});