export interface BJJConcept {
  _id?: string;
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  axis_self_opponent: number;
  axis_mental_physical: number;
  brightness: number;
  size: number;
  // Optional D3.js visualization properties
  cx?: number;
  cy?: number;
  r?: number;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
  
  // New training-specific fields for hexagon drills
  drill_mode?: boolean; // Is this also a drill?
  hexagon_icon?: string; // Path to icon (placeholder for now)
  current_mastery?: number; // 0-100%
  target_mastery?: number; // Usually 100%
  last_practiced?: string; // ISO date string
  next_review?: string; // ISO date string
  training_notes?: string;
}

export interface Category {
  name: string;
  color: string;
  _id?: string;
  xAxis?: { left: string; right: string };
  yAxis?: { bottom: string; top: string };
}

// New training-specific types
export interface BJJDrill {
  id: string;
  name: string;
  description: string;
  category: string;
  tags?: string[]; // Optional additional categories
  hexagon_icon: string;
  current_mastery: number; // 0-100%
  target_mastery: number; // Usually 100%
  last_practiced?: string;
  next_review?: string;
  training_notes?: string;
  difficulty: number; // 1-5
  estimated_duration: number; // minutes
}

export interface TrainingSession {
  id: string;
  date: string;
  duration: number; // minutes
  intensity: number; // 1-10 scale
  focus_areas: string[];
  drills_practiced: string[]; // Drill IDs
  notes: string;
  progress_rating: number; // 1-10 how well it went
}

export interface LabelItem {
  d: BJJConcept;
  x: number;
  y: number;
  fontSize: number;
  priority: number;
  width: number;
  height: number;
}

export interface LabelMode {
  type: 'hover' | 'all';
  description: string;
}

export interface ModalPosition {
  side: 'left' | 'right' | 'center';
  vertical: 'top' | 'bottom' | 'center';
}

export interface ContainerSize {
  width: number;
  height: number;
}

export interface AxisLabel {
  x: number;
  y: number;
  text: string;
  anchor: 'start' | 'middle' | 'end';
  rotation?: number;
} 