import React, { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CentroidFastGame from './CentroidFastGame';

interface CentroidViewProps { onClose?: () => void }

const CentroidView: React.FC<CentroidViewProps> = ({ onClose }) => {
  // Force GRIDFAST mode by simulating a click sequence after mount if needed
  // Simpler: the component defaults to GRIDFAST. We hide its top mode bar via CSS override.

  useEffect(() => {
    // Hide header while game is active by adding a class to body
    document.body.classList.add('game-fullscreen');
    return () => {
      document.body.classList.remove('game-fullscreen');
    };
  }, []);

  return (
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, pt: { xs: 2, sm: 3, md: 0 }, position: 'relative' }}>
      <IconButton
        onClick={() => { document.body.classList.remove('game-fullscreen'); onClose?.(); }}
        aria-label="close"
        sx={{ position: 'fixed', top: 8, left: 8, zIndex: 2100, bgcolor: 'rgba(0,0,0,0.35)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
      >
        <CloseIcon />
      </IconButton>
      <Box sx={{ width: '100%', maxWidth: 420 }}>
        <CentroidFastGame />
      </Box>
    </Box>
  );
};

export default CentroidView;


