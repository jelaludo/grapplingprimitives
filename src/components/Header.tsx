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
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  onCreateNode?: () => void;
  onCardsClick?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onStudiesClick?: () => void;
  onGraphsClick?: () => void;
  onLudusClick?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ onMobileMenuToggle, onCreateNode, onCardsClick, onHelpClick, onArticlesClick, onStudiesClick, onGraphsClick, onLudusClick }, ref) => {
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
                transition: 'font-size 200ms ease'
            }}
          >
            Grappling Primitives
          </Typography>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          {/* Desktop: Show all buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {process.env.NODE_ENV === 'development' && (
              <Button 
                variant="outlined" 
                  size={isIdle ? 'small' : 'small'}
                startIcon={<AddIcon />}
                onClick={onCreateNode}
                sx={{ 
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                  }
                }}
              >
                Create Node
              </Button>
            )}
            {process.env.NODE_ENV === 'development' && (
              <Button 
                variant="outlined" 
                size={isIdle ? 'small' : 'small'}
                onClick={onCardsClick}
                sx={{ 
                  color: 'text.primary',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                  }
                }}
              >
                Cards
              </Button>
            )}
            <Button 
              variant="outlined" 
                size={isIdle ? 'small' : 'small'}
              onClick={onArticlesClick}
              sx={{ 
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Articles
            </Button>
            <Button 
              variant="outlined" 
                size={isIdle ? 'small' : 'small'}
              onClick={onStudiesClick}
              sx={{ 
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Studies
            </Button>
            <Button 
              variant="outlined" 
                size={isIdle ? 'small' : 'small'}
              onClick={onGraphsClick}
              sx={{ 
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Graphs
            </Button>
            <Button 
              variant="outlined" 
                size={isIdle ? 'small' : 'small'}
              startIcon={<SportsEsportsIcon />}
              onClick={onLudusClick}
              sx={{ 
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Ludus
            </Button>
            <Button 
              variant="outlined" 
                size={isIdle ? 'small' : 'small'}
              startIcon={<HelpIcon />}
              onClick={onHelpClick}
              sx={{ 
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                }
              }}
            >
              Help
            </Button>
          </Box>

          {/* Mobile: Show hamburger menu + help icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="help"
              onClick={onHelpClick}
              sx={{ color: 'text.primary' }}
            >
              <HelpIcon />
            </IconButton>
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
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Create Node</ListItemText>
            </MenuItem>
          )}
          <MenuItem onClick={() => { onArticlesClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <ArticleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Articles</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onStudiesClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <SchoolIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Studies</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onGraphsClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <ShowChartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Graphs</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onLudusClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <SportsEsportsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ludus</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { onHelpClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
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