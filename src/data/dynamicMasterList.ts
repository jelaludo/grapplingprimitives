// Dynamic master list import
// Force using stable dataset to avoid importing new versioned TS files
export { categories, skillsMasterList } from './BJJMasterList_20250806_240Nodes';

// Re-export the canonical type
export type { BJJConcept } from '../types/concepts';

export const masterListMetadata = {
  fileName: 'BJJMasterList_20250806_240Nodes.ts',
  nodeCount: 240,
  date: '20250806'
};
