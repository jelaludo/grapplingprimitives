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
  ListItemIcon,
  ListItemText,
  Box,
  Slide,
  useScrollTrigger
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
        position="static" 
        sx={{ 
          backgroundColor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: 'none',
          transition: 'opacity 200ms ease, transform 200ms ease',
          opacity: isIdle ? 0.75 : 1,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: isIdle ? 40 : 64, transition: 'min-height 200ms ease' }}>
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
                fontSize: isIdle ? 18 : 20,
                transition: 'font-size 200ms ease',
                cursor: 'pointer',
            }}
            onClick={onTitleClick}
          >
            Grappling Primitives
          </Typography>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Desktop: Show all buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onMatrixClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>2x2</Button>
            {process.env.NODE_ENV === 'development' && (
              <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onCreateNode} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Create Node</Button>
            )}
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onCardsClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Cards</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onSkillCheckClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Skill Check</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onArticlesClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Articles</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onStudiesClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Studies</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onGraphsClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Graphs</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onLudusClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Ludus</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onGamesClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Games</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onCoachClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Coach</Button>
            <Button variant="outlined" size={isIdle ? 'small' : 'small'} onClick={onHelpClick} sx={{ color: 'text.primary', borderColor: 'divider', '&:hover': { borderColor: 'primary.main' } }}>Help</Button>
          </Box>

          {/* Mobile: Show hamburger menu + help icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            <Button variant="text" size="small" onClick={onHelpClick} sx={{ color: 'text.primary' }}>Help</Button>
            <IconButton
              color="inherit"
              aria-label="actions menu"
              onClick={handleActionsMenuOpen}
              sx={{ color: 'text.primary' }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
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