import React, { useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemText,
  Box,
  Slide,
  useScrollTrigger,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useFullscreen } from '../hooks/useFullscreen';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  onCreateNode?: () => void;
  onCardsClick?: () => void;
  onMatrixClick?: () => void;
  onTitleClick?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onStudiesClick?: () => void;
  onGraphsClick?: () => void;
  onLudusClick?: () => void;
  onGamesClick?: () => void;
  onCoachClick?: () => void;
  onSkillCheckClick?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ onMobileMenuToggle, onCreateNode, onCardsClick, onMatrixClick, onTitleClick, onHelpClick, onArticlesClick, onStudiesClick, onGraphsClick, onLudusClick, onGamesClick, onCoachClick, onSkillCheckClick }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);
  const trigger = useScrollTrigger();

  // Fullscreen controls for non-game pages too
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Idle -> compact header after N ms without interaction
  const [isIdle, setIsIdle] = useState(false);
  const IDLE_TIMEOUT_MS = 3000;

  useEffect(() => {
    let idleTimer: number | undefined;
    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimer) window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIsIdle(true), IDLE_TIMEOUT_MS);
    };
    // Initial arm
    idleTimer = window.setTimeout(() => setIsIdle(true), IDLE_TIMEOUT_MS);
    // Activity listeners
    const events: (keyof WindowEventMap)[] = ['mousemove', 'touchstart', 'keydown', 'wheel'];
    events.forEach(evt => window.addEventListener(evt, resetIdle, { passive: true }));
    return () => {
      if (idleTimer) window.clearTimeout(idleTimer);
      events.forEach(evt => window.removeEventListener(evt, resetIdle));
    };
  }, []);

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar 
        ref={ref}
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 'none',
          transition: 'opacity 200ms ease, transform 200ms ease',
          opacity: isIdle ? 0.75 : 1,
          top: 0,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: isIdle ? 32 : 40, transition: 'min-height 200ms ease', paddingTop: 'env(safe-area-inset-top)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && onMobileMenuToggle && (
            <IconButton
              color="inherit"
              aria-label="back to matrix"
              edge="start"
              onClick={onMobileMenuToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              fontWeight: 700,
              letterSpacing: 1,
              color: 'text.primary',
                fontSize: isIdle ? 16 : 18,
                transition: 'font-size 200ms ease',
                cursor: 'pointer',
            }}
            onClick={onTitleClick}
          >
            Grappling Primitives
          </Typography>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}>
            <IconButton onClick={toggleFullscreen} size="small" sx={{ color: 'text.primary' }}>
              {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          </Tooltip>
          {/* Always use compact overflow menu; removes mid-width clipping */}
          <IconButton
            color="inherit"
            aria-label="actions menu"
            onClick={handleActionsMenuOpen}
            sx={{ color: 'text.primary' }}
          >
            <MoreVertIcon />
          </IconButton>
        </div>

        {/* Actions Menu */}
        <Menu
          anchorEl={actionsMenuAnchor}
          open={Boolean(actionsMenuAnchor)}
          onClose={handleActionsMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {process.env.NODE_ENV === 'development' && (
            <MenuItem onClick={() => { onCreateNode?.(); handleActionsMenuClose(); }}>
              <ListItemText>Create Node</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={() => { onMatrixClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>2x2</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onArticlesClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Articles</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onStudiesClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Studies</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onGraphsClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Graphs</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onSkillCheckClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Skill Check</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onCardsClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Cards</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onLudusClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Ludus</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onGamesClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Games</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onCoachClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Coach</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onHelpClick?.(); handleActionsMenuClose(); }}>
            <ListItemText>Help</ListItemText>
          </MenuItem>
        </Menu>
        </Toolbar>
      </AppBar>
    </Slide>
  );
});

Header.displayName = 'Header';

export default Header; 