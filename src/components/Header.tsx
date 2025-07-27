import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/Help';

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
        </div>
      </Toolbar>
    </AppBar>
  );
});

Header.displayName = 'Header';

export default Header; 