import React from 'react';
import { CardGrid } from './CardGrid';
import CardCarousel from './CardCarousel';
import { BJJConcept } from '../../types/concepts';
import { Box, Typography } from '@mui/material';


interface CardsViewProps {
  concepts: BJJConcept[];
  selectedCategories: string[];
  query: string;
  filteredConcepts: BJJConcept[];
  hasSearch: boolean;
  resultCount: number;
}

export const CardsView: React.FC<CardsViewProps> = ({ 
  concepts, 
  selectedCategories, 
  query, 
  filteredConcepts, 
  hasSearch, 
  resultCount 
}) => {
  // Debug logging
  console.log('CardsView props:', {
    query,
    hasSearch,
    resultCount,
    filteredConceptsLength: filteredConcepts.length
  });

  return (
    <Box sx={{ p: 2 }}>
      {hasSearch ? (
        <>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            Search results: {resultCount} concept{resultCount !== 1 ? 's' : ''}
          </Typography>
          <CardCarousel concepts={filteredConcepts} />
          <CardGrid concepts={filteredConcepts} selectedCategories={selectedCategories} />
        </>
      ) : (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, textAlign: 'center' }}>
          Type to search concepts...
        </Typography>
      )}
    </Box>
  );
};

export default CardsView;


