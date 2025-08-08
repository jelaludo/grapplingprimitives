import { useMemo, useState } from 'react';
import { BJJConcept } from '../../../types/concepts';
import { loadRatings, saveRating } from '../storage/localProgress';

export function useCardsState(concepts: BJJConcept[]) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // empty => ALL
  const [sortKey, setSortKey] = useState<'alpha' | 'category'>('alpha');
  const [staged, setStaged] = useState<string[]>([]);
  const [ratings, setRatings] = useState(loadRatings());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = concepts.filter(c => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(c.category)) return false;
      if (!q) return true;
      return (
        c.concept.toLowerCase().includes(q) ||
        c.short_description.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });
    if (sortKey === 'alpha') {
      return [...list].sort((a, b) => a.concept.localeCompare(b.concept));
    }
    return [...list].sort((a, b) => a.category.localeCompare(b.category) || a.concept.localeCompare(b.concept));
  }, [concepts, query, selectedCategories, sortKey]);

  const toggleStage = (id: string) => {
    setStaged(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const setConceptRating = (id: string, rating: number) => {
    const next = saveRating(id, rating);
    setRatings(next);
  };

  return {
    query,
    setQuery,
    selectedCategories,
    setSelectedCategories,
    sortKey,
    setSortKey,
    staged,
    toggleStage,
    ratings,
    setConceptRating,
    filtered,
    toggleCategory: (name: string) => setSelectedCategories(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]),
    clearCategories: () => setSelectedCategories([]),
  } as const;
}


