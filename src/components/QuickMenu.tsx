import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface QuickMenuProps {
  onOpen: () => void;
  visible?: boolean;
}

const QuickMenu: React.FC<QuickMenuProps> = ({ onOpen, visible = true }) => {
  if (!visible) return null;
  return (
    <Tooltip title="Open menu">
      <Fab
        size="small"
        onClick={onOpen}
        aria-label="Open menu"
        sx={{
          position: 'fixed',
          left: 12,
          top: { xs: 'calc(env(safe-area-inset-top, 0px) + 48px)', md: 'calc(env(safe-area-inset-top, 0px) + 56px)' },
          zIndex: 2200,
          bgcolor: 'rgba(0,0,0,0.55)',
          color: 'white',
          backdropFilter: 'blur(6px)',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.75)' }
        }}
      >
        <MenuIcon fontSize="small" />
      </Fab>
    </Tooltip>
  );
};

export default QuickMenu;


