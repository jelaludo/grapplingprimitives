import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArticleIcon from '@mui/icons-material/Article';
import SchoolIcon from '@mui/icons-material/School';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
  onCreateNode?: () => void;
  onHelpClick?: () => void;
  onArticlesClick?: () => void;
  onStudiesClick?: () => void;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(({ onMobileMenuToggle, onCreateNode, onHelpClick, onArticlesClick, onStudiesClick }, ref) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [actionsMenuAnchor, setActionsMenuAnchor] = useState<null | HTMLElement>(null);

  const handleActionsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setActionsMenuAnchor(event.currentTarget);
  };

  const handleActionsMenuClose = () => {
    setActionsMenuAnchor(null);
  };

  return (
    <AppBar 
      ref={ref}
      position="static" 
      sx={{ 
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {isMobile && onMobileMenuToggle && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
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
                size="small"
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
            <Button 
              variant="outlined" 
              size="small"
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
              size="small"
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
              size="small"
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
          <MenuItem onClick={() => { onHelpClick?.(); handleActionsMenuClose(); }}>
            <ListItemIcon>
              <HelpIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Help</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header; 