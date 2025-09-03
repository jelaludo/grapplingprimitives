import React, { useEffect, useMemo, useState } from 'react';
import { Box, useTheme, useMediaQuery, Drawer, useScrollTrigger } from '@mui/material';
import QuickHome from '../components/QuickHome';
import QuickMenu from '../components/QuickMenu';

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

interface MainLayoutProps {
  sidebar: React.ReactNode;
  header?: React.ReactElement<HeaderProps>;
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
  const headerWithMobileMenu = header
    ? React.cloneElement(header, {
        onMobileMenuToggle: handleDrawerToggle,
      })
    : null;

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
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header (fixed) - only when provided by parent (matrix view) */}
      {headerWithMobileMenu && (
        <Box sx={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: theme.zIndex.appBar }}>
          <Box sx={{ pointerEvents: 'auto' }}>
            {headerWithMobileMenu}
          </Box>
        </Box>
      )}

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
            backgroundColor: 'background.default',
            // Minimal top padding, but allow immersive pages to opt-out by adding body.immersive
            pt: gameFullscreen || (typeof document !== 'undefined' && document.body.classList.contains('immersive')) ? 0 : { xs: 1, md: 2 },
          }}
        >
          {children}
          <QuickHome onHome={() => window.dispatchEvent(new CustomEvent('gp:navigate-home'))} visible={!gameFullscreen} />
          {/* Mobile quick menu to open the categories drawer when sidebar is provided */}
          <QuickMenu onOpen={handleDrawerToggle} visible={isMobile && Boolean(sidebar) && !gameFullscreen} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 