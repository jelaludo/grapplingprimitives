export interface LudusNode {
  id: string;
  concept: string;
  description: string;
  short_description: string;
  category: string;
  color: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  quadrant?: 'trivial-noob' | 'crucial-noob' | 'trivial-master' | 'crucial-master';
  importance: number; // 1-10
  mastery: number; // 1-10
  // D3.js visualization properties
  cx?: number;
  cy?: number;
  r?: number;
  opacity?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface LudusState {
  nodes: LudusNode[];
  selectedNodes: string[];
  isPhysicsActive: boolean;
}

export interface LudusStorage {
  ludusNodes: LudusNode[];
  quadrantPlacements: Record<string, { 
    quadrant: string; 
    importance: number; 
    mastery: number; 
  }>;
  lastUpdated: number;
}

export interface LudusReview {
  lastReviewed: number;
  nextReview: number;
  masteryHistory: number[];
  reviewCount: number;
  cardType: 'name-to-desc' | 'desc-to-name';
}

export interface LudusReviews {
  [nodeId: string]: LudusReview;
} 