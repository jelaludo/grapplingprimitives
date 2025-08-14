import React, { useEffect } from 'react';
import { Fab, Tooltip } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';

interface QuickHomeProps {
  onHome: () => void;
  visible?: boolean;
}

const QuickHome: React.FC<QuickHomeProps> = ({ onHome, visible = true }) => {
  // Removed global 'H' hotkey to avoid interfering with typing in inputs

  const safeGoHome = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {}
    document.body.classList.remove('game-fullscreen');
    document.body.classList.remove('immersive');
    onHome();
  };

  if (!visible) return null;

  return (
    <Tooltip title="Back to Home (H)">
      <Fab
        size="small"
        onClick={safeGoHome}
        aria-label="Back to Home"
        sx={{
          position: 'fixed',
          left: 12,
          bottom: 12,
          zIndex: 2200,
          bgcolor: 'rgba(0,0,0,0.55)',
          color: 'white',
          backdropFilter: 'blur(6px)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }
        }}
      >
        <GridViewIcon fontSize="small" />
      </Fab>
    </Tooltip>
  );
};

export default QuickHome;


