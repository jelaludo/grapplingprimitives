import React, { useMemo, useState } from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';
import { BJJConcept } from '../../types/concepts';

interface StudyModeProps {
  concepts: BJJConcept[];
  onExit: () => void;
  onRate: (id: string, rating: number) => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ concepts, onExit, onRate }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [value, setValue] = useState<number>(5);

  const current = useMemo(() => concepts[index], [concepts, index]);
  const atEnd = index >= concepts.length - 1;

  if (!current) return (
    <Box sx={{ p: 3 }}>
      <Typography>No concepts selected.</Typography>
      <Button sx={{ mt: 2 }} onClick={onExit}>Back</Button>
    </Box>
  );

  return (
    <Box sx={{ p: 2, display: 'grid', gap: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {index + 1} / {concepts.length}
      </Typography>
      <Box sx={{ perspective: 1000, cursor: 'pointer' }} onClick={() => setFlipped(v => !v)}>
        <Box sx={{ position: 'relative', height: 200, transformStyle: 'preserve-3d', transition: 'transform 400ms', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
          <Box sx={{ position: 'absolute', inset: 0, p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1, display: 'grid', alignContent: 'center', backfaceVisibility: 'hidden' }}>
            <Typography variant="h5" textAlign="center">{current.concept}</Typography>
          </Box>
          <Box sx={{ position: 'absolute', inset: 0, p: 2, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', display: 'grid', alignContent: 'center' }}>
            <Typography variant="body1" textAlign="center">{current.short_description}</Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="body2" sx={{ mb: 1 }}>How confident are you with this concept?</Typography>
        <Slider
          value={value}
          onChange={(_, v) => setValue(v as number)}
          step={1}
          min={1}
          max={10}
          marks={[1,2,3,4,5,6,7,8,9,10].map(n => ({ value: n, label: n % 2 === 1 ? String(n) : '' }))}
          valueLabelDisplay="auto"
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={onExit}>Exit</Button>
        <Button variant="contained" onClick={() => { onRate(current.id, value); setFlipped(false); setIndex(i => Math.min(i + 1, concepts.length - 1)); }}>
          {atEnd ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default StudyMode;


