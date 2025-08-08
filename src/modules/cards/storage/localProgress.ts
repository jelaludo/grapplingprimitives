import { ConceptIdToRating, ConceptRatingRecord } from '../types';

const STORAGE_KEY = 'cards_concept_ratings_v1';

export function loadRatings(): ConceptIdToRating {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as ConceptIdToRating;
    return parsed || {};
  } catch {
    return {};
  }
}

export function saveRating(conceptId: string, rating: number): ConceptIdToRating {
  const now = new Date().toISOString();
  const current = loadRatings();
  const record: ConceptRatingRecord = { conceptId, rating, updatedAt: now };
  const next: ConceptIdToRating = { ...current, [conceptId]: record };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}


