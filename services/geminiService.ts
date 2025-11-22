import { GoogleGenAI } from "@google/genai";
import { TYLER_BIO } from '../constants';

// Initialize the API client.
// Note: process.env.API_KEY is handled by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateChatResponse = async (userMessage: string, history: { role: string, parts: { text: string }[] }[]) => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Construct the prompt with context
    const systemInstruction = `
      You are an AI assistant living on Tyler Wares' personal website. 
      Your persona is witty, slightly chaotic, tech-savvy, and very enthusiastic about Tyler's projects.
      
      Here is everything you need to know about Tyler:
      ${TYLER_BIO}
      
      Keep answers concise (under 3 sentences usually), fun, and informal. 
      If asked about something not in the bio, make a clever joke or pivot back to his interests (EDM, AI, DIY).
      Do NOT be boring. Do NOT use purple prose.
    `;

    const chatSession = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.9, // Higher creativity for "chaotic" vibe
      },
      history: history,
    });

    const result = await chatSession.sendMessage({ message: userMessage });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Whoops! My AI brain short-circuited. Too much EDM? Try again later.";
  }
};