export interface Project {
  id: string;
  name: string;
  domain: string;
  description: string;
  status: 'Live' | 'Building' | 'Concept';
  color: string;
}

export interface Interest {
  name: string;
  category: 'Tech' | 'Lifestyle' | 'Music' | 'Mind';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}