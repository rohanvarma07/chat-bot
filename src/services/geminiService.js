// Gemini API Service
class GeminiService {
    constructor() {
        this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';
        
        if (!this.apiKey) {
            console.error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
        }
    }

    async generateResponse(message, abortSignal) {
        if (!this.apiKey) {
            throw new Error('Gemini API key is not configured');
        }

        try {
            const requestBody = {
                contents: [{
                    parts: [{
                        text: message
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            };
            
            console.log('Sending request to Gemini:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                signal: abortSignal
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    errorData = { message: errorText };
                }
                throw new Error(`Gemini API Error (${response.status}): ${errorData.error?.message || errorData.message || response.statusText}`);
            }

            const data = await response.json();
            console.log('Full API Response:', JSON.stringify(data, null, 2));
            
            // Handle different possible response structures
            if (data.candidates && data.candidates.length > 0) {
                const candidate = data.candidates[0];
                
                // Check for finish reasons that indicate issues
                if (candidate.finishReason === 'MAX_TOKENS') {
                    return "I apologize, but my response was cut off due to length limits. Could you please try asking a more specific or shorter question?";
                }
                
                if (candidate.finishReason === 'SAFETY') {
                    return "I'm sorry, but I can't provide a response to that message due to content policy restrictions.";
                }
                
                // Check for content.parts structure
                if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
                    return candidate.content.parts[0].text;
                }
                
                // Check for direct text property
                if (candidate.text) {
                    return candidate.text;
                }
                
                // Check for message property
                if (candidate.message) {
                    return candidate.message;
                }
                
                // If we have a finish reason but no content, handle it
                if (candidate.finishReason && !candidate.content?.parts) {
                    return `Unable to generate a response. Reason: ${candidate.finishReason}. Please try a different message.`;
                }
            }
            
            // Check if there's a direct text response
            if (data.text) {
                return data.text;
            }
            
            // Check if there's a message property
            if (data.message) {
                return data.message;
            }
            
            console.error('Unexpected response structure:', data);
            throw new Error('Invalid response format from Gemini API');
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw error;
        }
    }

    // Check if API key is configured
    isConfigured() {
        return !!this.apiKey;
    }
}

export default new GeminiService();
