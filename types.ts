
export enum InteractionType {
  MESSAGE = 'Mensaje',
  CALL = 'Llamada',
  OUTING = 'Salida',
}

export interface Interaction {
  id: string;
  date: string; // ISO String
  type: InteractionType;
  note: string;
}

export interface CategorizedIdeas {
  messages: string[];
  calls: string[];
  activities: string[];
}

export interface Contact {
  id: string;
  name: string;
  relation: string;
  frequencyDays: number;
  // US-002.3: Additional key info (Interests, likes, etc.)
  keyInfo: string; 
  
  // Deprecated: aiSummary (kept for backward compatibility)
  aiSummary?: string;

  // New AI Fields
  aiProfile?: string; // Deep description starting with "Name is..."
  aiIdeas?: CategorizedIdeas; // Structured ideas
  
  interactions: Interaction[];
  lastInteractionDate: string; // ISO String
}

export interface UserProfile {
  name: string;
  age: string;
  isOnboardingComplete: boolean;
}

export interface AppData {
  user: UserProfile | null;
  contacts: Contact[];
}