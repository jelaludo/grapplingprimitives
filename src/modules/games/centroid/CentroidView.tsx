import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import CentroidFastGame from './CentroidFastGame';

const CentroidView: React.FC = () => {
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
    <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, pt: { xs: 2, sm: 3, md: 0 } }}>
      <Box sx={{ width: '100%', maxWidth: 420 }}>
        <CentroidFastGame />
      </Box>
    </Box>
  );
};

export default CentroidView;


