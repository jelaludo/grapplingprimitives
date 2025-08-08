import React, { useState } from 'react';
import { Box, Button, Chip, Typography } from '@mui/material';
import { BJJConcept } from '../../types/concepts';

interface CardFlipProps {
  concept: BJJConcept;
  onStage: (id: string) => void;
  onOpen?: (concept: BJJConcept) => void;
  compact?: boolean; // hide text by default; reveal on hover
}

export const CardFlip: React.FC<CardFlipProps> = ({ concept, onStage, onOpen, compact = false }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      sx={{
        perspective: 1000,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 200ms ease, z-index 0ms',
        '&:hover': compact ? { transform: 'scale(1.06)', zIndex: 2 } : undefined,
        // reveal text on hover when compact
        '&:hover .reveal': compact ? { opacity: 1 } : undefined,
      }}
      onClick={() => {
        if (onOpen) {
          onOpen(concept);
        } else {
          setFlipped(v => !v);
        }
      }}
      role="button"
      aria-pressed={flipped}
      tabIndex={0}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 180,
          transformStyle: 'preserve-3d',
          transition: 'transform 450ms',
          transform: flipped ? 'rotateY(180deg)' : 'none',
        }}
      >
        {/* Front */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1,
            backdropFilter: 'blur(6px)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Typography className={compact ? 'reveal' : undefined} variant="subtitle2" color="text.secondary" sx={{ opacity: compact ? 0 : 1, transition: 'opacity 200ms' }}>
            {concept.category}
          </Typography>
          <Typography className={compact ? 'reveal' : undefined} variant="h6" fontWeight={700} sx={{ opacity: compact ? 0 : 1, transition: 'opacity 200ms' }}>
            {concept.concept}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip size="small" label="Stage" onClick={(e) => { e.stopPropagation(); onStage(concept.id); }} />
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: concept.color }} />
          </Box>
        </Box>

        {/* Back */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 1,
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {concept.concept}
          </Typography>
          <Typography variant="body2" color="text.primary" sx={{ overflow: 'hidden' }}>
            {concept.short_description}
          </Typography>
          <Button size="small" variant="text" sx={{ alignSelf: 'flex-start' }} onClick={(e) => { e.stopPropagation(); setFlipped(false); }}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardFlip;


