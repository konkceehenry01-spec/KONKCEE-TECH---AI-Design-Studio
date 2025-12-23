
import { GoogleGenAI, Type } from "@google/genai";
import { DesignCanvas } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const DESIGN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    width: { type: Type.NUMBER },
    height: { type: Type.NUMBER },
    backgroundColor: { type: Type.STRING },
    elements: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          type: { type: Type.STRING },
          x: { type: Type.NUMBER },
          y: { type: Type.NUMBER },
          width: { type: Type.NUMBER },
          height: { type: Type.NUMBER },
          content: { type: Type.STRING },
          fill: { type: Type.STRING },
          fontSize: { type: Type.NUMBER },
          fontWeight: { type: Type.STRING },
          fontFamily: { type: Type.STRING },
          borderRadius: { type: Type.NUMBER },
          rotation: { type: Type.NUMBER }
        },
        required: ['id', 'type', 'x', 'y', 'width', 'height']
      }
    }
  },
  required: ['name', 'width', 'height', 'backgroundColor', 'elements']
};

export async function generateDesignFromPrompt(prompt: string): Promise<DesignCanvas[]> {
  const systemInstruction = `
    You are KONKCEE-TECH's AI Design Engine. 
    Convert user prompts into professional graphic designs.
    Generate a set of 3 distinct, high-quality layout variations.
    Each layout should be an object representing a canvas with elements like text, shapes, and images.
    Focus on minimalist, tech-forward aesthetics. 
    Colors should be professional: use deep blues, purples, slate, and clean whites.
    Standard Canvas: 1080x1080 (Social Media) or 1050x600 (Business Card).
    Be creative with font weights and spacing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate 3 distinct design options for: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: DESIGN_SCHEMA
        }
      }
    });

    // The text property (not method) directly returns the output string.
    const designs: DesignCanvas[] = JSON.parse(response.text || '[]');
    return designs;
  } catch (error) {
    console.error("Design generation failed:", error);
    return [];
  }
}
