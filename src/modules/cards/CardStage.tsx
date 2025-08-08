import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BJJConcept } from '../../types/concepts';

interface CardStageProps {
  concepts: BJJConcept[];
  stagedIds: string[];
  onToggleStage: (id: string) => void;
}

export const CardStage: React.FC<CardStageProps> = ({ concepts, stagedIds, onToggleStage }) => {
  if (stagedIds.length === 0) return null;
  const staged = concepts.filter(c => stagedIds.includes(c.id));
  return (
    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Stage ({staged.length})
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {staged.map(c => (
          <Box key={c.id} sx={{ px: 1.5, py: 1, borderRadius: 1, bgcolor: 'background.paper', boxShadow: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c.color }} />
            <Typography variant="body2">{c.concept}</Typography>
            <IconButton size="small" onClick={() => onToggleStage(c.id)}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CardStage;


