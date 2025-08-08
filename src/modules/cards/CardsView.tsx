import React, { useMemo } from 'react';
import { CardGrid } from './CardGrid';
import CardCarousel from './CardCarousel';
import { BJJConcept } from '../../types/concepts';
import { Box } from '@mui/material';

interface CardsViewProps {
  concepts: BJJConcept[];
  selectedCategories: string[];
  query: string;
}

export const CardsView: React.FC<CardsViewProps> = ({ concepts, selectedCategories, query }) => {
  const filteredForView = useMemo(() => {
    const list = selectedCategories.length === 0
      ? concepts
      : concepts.filter(c => selectedCategories.includes(c.category));
    const q = (query || '').trim().toLowerCase();
    if (!q) return list;
    return list.filter(c =>
      c.concept.toLowerCase().includes(q) ||
      c.short_description.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    );
  }, [concepts, selectedCategories, query]);

  return (
    <Box sx={{ p: 2 }}>
      <CardCarousel concepts={filteredForView} />
      <CardGrid concepts={concepts} selectedCategories={selectedCategories} query={query} />
    </Box>
  );
};

export default CardsView;


