import React, { useMemo, useState } from 'react';
import { Box, useTheme, useMediaQuery, Drawer, useScrollTrigger } from '@mui/material';
import RetroMessage from '../components/RetroMessage';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

interface MainLayoutProps {
  sidebar: React.ReactNode;
  header: React.ReactElement<HeaderProps>;
  children: React.ReactNode;
  onFirstInteraction?: () => void;
}

const SIDEBAR_WIDTH = 260;
const HEADER_HEIGHT = 64;

const MainLayout: React.FC<MainLayoutProps> = ({ sidebar, header, children, onFirstInteraction }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrollTrigger = useScrollTrigger();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: '100%',
        overflowY: 'auto',
        backgroundColor: 'background.paper',
        borderRight: 1,
        borderColor: 'divider',
        p: 2,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {sidebar}
    </Box>
  );

  // Clone header and pass props
  const headerWithMobileMenu = React.cloneElement(header, {
    onMobileMenuToggle: handleDrawerToggle,
  });

  const computedHeaderHeight = useMemo(() => (scrollTrigger ? 0 : HEADER_HEIGHT), [scrollTrigger]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <Box sx={{ height: computedHeaderHeight, transition: 'height 200ms ease', flexShrink: 0 }}>
        {headerWithMobileMenu}
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, height: `calc(100vh - ${computedHeaderHeight}px)` }}>
        {/* Desktop Sidebar - Only when a sidebar is provided */}
        {!isMobile && sidebar ? sidebarContent : null}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                width: SIDEBAR_WIDTH,
                boxSizing: 'border-box',
                backgroundColor: 'background.paper',
                borderRight: 1,
                borderColor: 'divider',
              },
            }}
          >
            {sidebarContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
            backgroundColor: 'background.default',
          }}
        >
          {children}
        </Box>
      </Box>
      
      {/* Retro Message Overlay */}
      <RetroMessage onFirstInteraction={onFirstInteraction} />
    </Box>
  );
};

export default MainLayout; 