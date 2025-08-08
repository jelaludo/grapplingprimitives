export interface ConceptRatingRecord {
  conceptId: string;
  rating: number; // 1–10
  updatedAt: string; // ISO timestamp
}

export type ConceptIdToRating = Record<string, ConceptRatingRecord>;

export interface StagedConcept {
  id: string;
}


