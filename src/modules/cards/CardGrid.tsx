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
  query?: string;
}

export const CardGrid: React.FC<CardGridProps> = ({ concepts, selectedCategories, query }) => {
  const cards = useCardsState(concepts);
  const [studyMode, setStudyMode] = useState(false);
  const [openConcept, setOpenConcept] = useState<BJJConcept | null>(null);

  const filtered = useMemo(() => {
    const list = (selectedCategories.length === 0)
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
          onRate={cards.setConceptRating}
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
                <CardFlip compact concept={c} onStage={cards.toggleStage} onOpen={setOpenConcept} />
              </Box>
            ))}
          </Box>
          <CardStage concepts={concepts} stagedIds={cards.staged} onToggleStage={cards.toggleStage} />
          <CardDetailDialog open={Boolean(openConcept)} concept={openConcept} onClose={() => setOpenConcept(null)} />
        </>
      )}
    </Box>
  );
};

export default CardGrid;


