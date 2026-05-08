export type Page = 'home' | 'rules' | 'characters' | 'tasks' | 'buildings' | 'qa';

export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  ability: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Building {
  id: string;
  name: string;
  description: string;
  effect: string;
  location: string;
}

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface RuleSection {
  title: string;
  content: string;
}
