// Dynamic master list import
// TEMP during Phase 1: point to last known good typed dataset in src
export { categories, skillsMasterList } from './BJJMasterList_20250806_240Nodes';

// Re-export the canonical concept type
export type { BJJConcept } from '../types/concepts';

// Metadata (temporary until Phase 3 introduces canonical JSON)
export const masterListMetadata = {
  fileName: 'BJJMasterList_20250806_240Nodes.ts',
  nodeCount: 240,
  date: '20250806'
};
