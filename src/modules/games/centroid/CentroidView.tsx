import React, { useEffect, useRef } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
// Single source of truth for Centroid game
import CentroidFastGame from './CentroidFastGame';
import { useFullscreen } from '../../..//hooks/useFullscreen';

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

  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(containerRef);

  return (
    <Box ref={containerRef} sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: { xs: 'flex-start', md: 'center' }, pt: { xs: 2, sm: 3, md: 0 }, position: 'relative' }}>
      <Box sx={{ position: 'fixed', top: 8, left: 8, zIndex: 2100, display: 'flex', gap: 1 }}>
        <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}>
          <IconButton onClick={toggleFullscreen} aria-label="fullscreen" sx={{ bgcolor: 'rgba(0,0,0,0.35)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Tooltip>
        <IconButton
          onClick={() => { document.body.classList.remove('game-fullscreen'); onClose?.(); }}
          aria-label="close"
          sx={{ bgcolor: 'rgba(0,0,0,0.35)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: '100%', maxWidth: 420 }}>
        <CentroidFastGame />
      </Box>
    </Box>
  );
};

export default CentroidView;


