import { GoogleGenAI } from "@google/genai";

// Safely get the API key
const apiKey = process.env.API_KEY || '';

export const generateMissionName = async (context: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key missing");
    return "PROTOCOL: OMEGA";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Use the 2.5 Flash model for speed and efficiency
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a single, short, cool, cyberpunk/military style operation name for a mission related to: "${context}". 
      Format: "OPERATION: [NAME]" or "PROTOCOL: [NAME]". 
      Max 4 words. Uppercase only. No markdown.`,
    });

    const text = response.text;
    return text ? text.trim() : "OPERATION: SILENT";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM FAILURE";
  }
};
