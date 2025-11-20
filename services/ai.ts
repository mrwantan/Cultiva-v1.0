
import { GoogleGenAI, Type } from "@google/genai";
import { Contact, CategorizedIdeas } from "../types";

// Initialize Gemini API
// The API key must be obtained exclusively from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface AIInsights {
  profile?: string;
  ideas?: CategorizedIdeas;
}

export const generateContactInsights = async (contact: Contact): Promise<AIInsights> => {
  // Defensive check for environment
  if (!process.env.API_KEY) {
    console.warn("API_KEY is missing. AI insights will not be generated.");
    return {};
  }

  // Prepare the prompt context
  const interactionsList = contact.interactions
    .slice(0, 10) // More context for profile generation
    .map(i => `- [${new Date(i.date).toLocaleDateString()}] (${i.type}): ${i.note || 'Sin nota'}`)
    .join('\n');

  const prompt = `
    Actúa como un experto en psicología social y gestión de relaciones personales.
    Analiza la información y el historial de interacciones con este contacto para generar dos cosas:
    
    1. PERFIL ("profile"): Un párrafo corto y narrativo (máximo 3 oraciones).
       ESTRUCTURA OBLIGATORIA: Debes comenzar la frase exactamente así: "${contact.name} es [personalidad], le gusta [gustos] y le interesa [intereses]..."
       Incluye cualquier otro dato clave importante al final del párrafo.
       Mantén un tono cálido.
    
    2. IDEAS ("ideas"): Sugerencias concretas para conectar, AGRUPADAS por tipo:
       - messages: 2-3 ideas de mensajes de texto cortos para romper el hielo o saludar.
       - calls: 2-3 temas de conversación para una llamada telefónica.
       - activities: 2-3 ideas de planes, salidas o actividades para hacer juntos (presencial o virtual).
       - IMPORTANTE: Las ideas deben ser accionables y específicas basadas en el contexto.
    
    DATOS DEL CONTACTO:
    - Nombre: ${contact.name}
    - Relación: ${contact.relation}
    - Info Inicial: ${contact.keyInfo}
    
    HISTORIAL:
    ${interactionsList}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profile: { type: Type.STRING },
            ideas: {
              type: Type.OBJECT,
              properties: {
                messages: { type: Type.ARRAY, items: { type: Type.STRING } },
                calls: { type: Type.ARRAY, items: { type: Type.STRING } },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            }
          }
        }
      }
    });
    
    const text = response.text;
    if (!text) return {};

    return JSON.parse(text) as AIInsights;

  } catch (error) {
    console.error("Error generating AI insights:", error);
    return {};
  }
};
