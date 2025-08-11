import React, { useEffect, useMemo, useState } from 'react';
import { Box, useTheme, useMediaQuery, Drawer, useScrollTrigger } from '@mui/material';
import RetroMessage from '../components/RetroMessage';
import QuickHome from '../components/QuickHome';

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

  const [gameFullscreen, setGameFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const update = () => setGameFullscreen(typeof document !== 'undefined' && document.body.classList.contains('game-fullscreen'));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const computedHeaderHeight = useMemo(() => {
    if (gameFullscreen) return 0;
    return scrollTrigger ? 0 : HEADER_HEIGHT;
  }, [gameFullscreen, scrollTrigger]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header (fixed) - we overlay it; reserve no vertical space */}
      <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
        <Box sx={{ pointerEvents: 'auto' }}>
          {headerWithMobileMenu}
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0, height: '100vh' }}>
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
            // Minimal top padding, but allow immersive pages to opt-out by adding body.immersive
            pt: gameFullscreen || (typeof document !== 'undefined' && document.body.classList.contains('immersive')) ? 0 : { xs: 1, md: 2 },
          }}
        >
          {children}
          <QuickHome onHome={() => window.dispatchEvent(new CustomEvent('gp:navigate-home'))} visible={!gameFullscreen} />
        </Box>
      </Box>
      
      {/* Retro Message Overlay */}
      <RetroMessage onFirstInteraction={onFirstInteraction} />
    </Box>
  );
};

export default MainLayout; 