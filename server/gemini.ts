// Google Gemini AI integration for tax assistance
// Using free Google AI Studio API instead of OpenAI

interface GeminiMessage {
  role: "user" | "model";
  parts: Array<{ text: string }>;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
  }>;
}

class GeminiAI {
  private apiKey: string;
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  constructor() {
    this.apiKey = process.env.GOOGLE_AI_API_KEY || "";
    if (!this.apiKey) {
      console.warn("⚠️  GOOGLE_AI_API_KEY not found. AI assistance will not work.");
    }
  }

  async generateTaxAssistance(
    question: string,
    context: {
      countryCode: string;
      formType: string;
      language: string;
      formData?: Record<string, any>;
    }
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error("Google AI API key not configured");
    }

    const systemPrompt = this.buildSystemPrompt(context);
    const userMessage = `${systemPrompt}\n\nUser Question: ${question}`;

    try {
      const response = await fetch(
        `${this.baseUrl}/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: userMessage }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API error:", errorText);
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error("No response from Gemini AI");
      }

      const responseText = data.candidates[0].content.parts[0].text;
      return responseText;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  }

  private buildSystemPrompt(context: {
    countryCode: string;
    formType: string;
    language: string;
    formData?: Record<string, any>;
  }): string {
    const languageNames: Record<string, string> = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      zh: "Chinese",
    };

    const languageName = languageNames[context.language] || "English";

    return `You are an expert tax assistant helping users fill out their tax forms. 

Context:
- Country: ${context.countryCode}
- Tax Form: ${context.formType}
- Response Language: ${languageName}

Your role:
1. Provide accurate, helpful tax guidance specific to ${context.countryCode} tax laws
2. Explain tax concepts in simple, easy-to-understand language
3. Suggest appropriate deductions and credits the user may qualify for
4. Help users understand what information is needed for each field
5. Always respond in ${languageName}
6. Be concise but thorough
7. If you're unsure about specific tax laws, recommend consulting a tax professional

Important: 
- Focus on general guidance and education
- Do not provide specific tax advice or guarantee outcomes
- Remind users to verify information with official tax authorities
- Respond ONLY in ${languageName}`;
  }

  async generateDeductionSuggestions(
    formData: Record<string, any>,
    countryCode: string,
    language: string
  ): Promise<string[]> {
    const prompt = `Based on this taxpayer information for ${countryCode}, suggest potential tax deductions they may qualify for. 
    
Income Information:
${JSON.stringify(formData, null, 2)}

Provide a list of 3-5 specific deduction suggestions with brief explanations. Respond in ${language}.`;

    try {
      const response = await this.generateTaxAssistance(prompt, {
        countryCode,
        formType: "general",
        language,
        formData,
      });

      // Parse the response into an array of suggestions
      const suggestions = response
        .split("\n")
        .filter((line) => line.trim().length > 0 && !line.startsWith("#"))
        .slice(0, 5);

      return suggestions;
    } catch (error) {
      console.error("Error generating deduction suggestions:", error);
      return [];
    }
  }
}

export const geminiAI = new GeminiAI();
