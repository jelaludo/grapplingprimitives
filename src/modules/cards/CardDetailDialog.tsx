import React from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BJJConcept } from '../../types/concepts';

interface CardDetailDialogProps {
  open: boolean;
  concept: BJJConcept | null;
  onClose: () => void;
}

export const CardDetailDialog: React.FC<CardDetailDialogProps> = ({ open, concept, onClose }) => {
  if (!concept) return null;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        {concept.concept}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: concept.color }} />
          <Typography variant="caption" color="text.secondary">{concept.category}</Typography>
        </Box>
        <Typography variant="body1" whiteSpace="pre-wrap">
          {concept.description || concept.short_description || 'No description available.'}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailDialog;


