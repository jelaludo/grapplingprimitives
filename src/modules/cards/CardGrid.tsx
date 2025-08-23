import React, { useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { BJJConcept } from '../../types/concepts';
import { useCardsState } from './hooks/useCardsState';
import CardFlip from './CardFlip';
import CardStage from './CardStage';
import StudyMode from './StudyMode';
import CardDetailDialog from './CardDetailDialog';

interface CardGridProps {
  concepts: BJJConcept[];
  selectedCategories: string[];
}

export const CardGrid: React.FC<CardGridProps> = ({ concepts, selectedCategories }) => {
  // Don't use useCardsState for filtering since concepts are already filtered
  const [studyMode, setStudyMode] = useState(false);
  const [openConcept, setOpenConcept] = useState<BJJConcept | null>(null);
  const [staged, setStaged] = useState<string[]>([]);
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('cardRatings');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Use the pre-filtered concepts directly
  const filtered = concepts;

  const toggleStage = (id: string) => {
    setStaged(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const setConceptRating = (id: string, rating: number) => {
    const newRatings = { ...ratings, [id]: rating };
    setRatings(newRatings);
    localStorage.setItem('cardRatings', JSON.stringify(newRatings));
  };

  return (
    <Box sx={{ p: 2, width: '100%', overflow: 'auto' }}>
      <Stack direction={{ xs: 'row' }} spacing={1} sx={{ mb: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => setStudyMode(true)} disabled={filtered.length === 0}>
          Study {filtered.length}
        </Button>
      </Stack>

      {studyMode ? (
        <StudyMode
          concepts={filtered}
          onExit={() => setStudyMode(false)}
          onRate={setConceptRating}
        />
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
            }}
          >
            {filtered.map(c => (
              <Box key={c.id}>
                <CardFlip compact concept={c} onStage={toggleStage} onOpen={setOpenConcept} />
              </Box>
            ))}
          </Box>
          <CardStage concepts={concepts} stagedIds={staged} onToggleStage={toggleStage} />
          <CardDetailDialog open={Boolean(openConcept)} concept={openConcept} onClose={() => setOpenConcept(null)} />
        </>
      )}
    </Box>
  );
};

export default CardGrid;


