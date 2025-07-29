// Dynamic master list import - auto-generated
// This file is automatically updated to import the latest master list
// Last updated: 2025-07-29T06:27:16.796Z
// Source file: BJJMasterList_20250729_225Nodes.ts

// Import the latest master list data
export { categories, skillsMasterList } from './BJJMasterList_20250729_225Nodes';

// Re-export the interface for type safety
export interface BJJConcept {
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
}

// Export metadata about the current file
export const masterListMetadata = {
  fileName: 'BJJMasterList_20250729_225Nodes.ts',
  nodeCount: 225,
  date: '20250729',
  lastModified: '2025-07-29T06:27:16.796Z'
};
