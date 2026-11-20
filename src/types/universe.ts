export type NodeCategory = 
  | 'about'
  | 'projects' 
  | 'journey' 
  | 'dna' 
  | 'college' 
  | 'after-college'
  | 'beyond' 
  | 'contact';

export interface GalaxyNode {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  category: NodeCategory;
  position: [number, number, number];
  size?: number;
  techStack: string[];
  connections: string[];
  badge?: string;
  repoUrl?: string;
  liveUrl?: string;
  summary: string;
  originStory?: string;
  detailedContent?: string;
  customVisualizer?: 'projects-hub' | 'intellex' | 'aml' | 'customer' | 'drishti' | 'hackathon' | 'college' | 'dna' | 'after-college' | 'cardistry' | 'contact';
  keyInsights?: string[];
  metrics?: { label: string; value: string; note?: string }[];
}

export interface CategoryInfo {
  id: NodeCategory;
  label: string;
  color: string;
  glowColor: string;
  description: string;
  iconName: string;
}
