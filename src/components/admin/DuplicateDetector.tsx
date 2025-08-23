import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { BJJConcept } from '../../types/concepts';

interface DuplicateDetectorProps {
  concepts: BJJConcept[];
  onUpdateConcepts?: (concepts: BJJConcept[]) => void;
}

export const DuplicateDetector: React.FC<DuplicateDetectorProps> = ({ 
  concepts, 
  onUpdateConcepts 
}) => {
  // Simple duplicate detection for now
  const nameGroups = new Map<string, BJJConcept[]>();
  concepts.forEach(concept => {
    const key = concept.concept.toLowerCase().trim();
    if (!nameGroups.has(key)) {
      nameGroups.set(key, []);
    }
    nameGroups.get(key)!.push(concept);
  });

  const duplicates = Array.from(nameGroups.entries())
    .filter(([key, items]) => items.length > 1)
    .map(([key, items]) => ({ key, items }));

  if (duplicates.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="success">
          No duplicates found! Your data is clean.
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Duplicate Detector (Simple)
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        Found {duplicates.length} duplicate groups:
      </Typography>

      {duplicates.map(({ key, items }) => (
        <Box key={key} sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 1 }}>
          <Typography variant="h6" color="error">
            "{key}" - {items.length} duplicates
          </Typography>
          {items.map((concept, index) => (
            <Typography key={concept.id} variant="body2" sx={{ ml: 2 }}>
              {index + 1}. {concept.concept} (ID: {concept.id})
            </Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
};
