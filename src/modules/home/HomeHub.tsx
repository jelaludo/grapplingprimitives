import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import './homehub-mobile.css';
import CentroidCardPreview from '../games/previews/CentroidCardPreview';
import MemoryCardPreview from '../games/previews/MemoryCardPreview';
import TimerCardPreview from '../coach/previews/TimerCardPreview';
import SkillCheckCardPreview from '../skillcheck/previews/SkillCheckCardPreview';
import TrainingCardPreview from '../training/TrainingCardPreview';
import StoriesCardPreview from '../stories/StoriesCardPreview';
import BeltDropoutCardPreview from '../beltdropout/BeltDropoutCardPreview';

interface HomeHubProps {
  goMatrix: () => void;
  goCards: () => void;
  goGraphs: () => void;
  goGames: (initial?: 'none' | 'centroid' | 'memory') => void;
  goCoach: () => void;
  goSkillCheck: () => void;
  goArticles: () => void;
  goStudies: () => void;
  goLudus: () => void;
  goOthers?: () => void;
  goCalendar: () => void;
  goTraining: () => void;
  goStories: () => void;
  goBeltDropout: () => void;
  goWeightClass: () => void;
}

const HomeHub: React.FC<HomeHubProps> = (props) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);
  
  // Check if container is scrollable after mount
  React.useEffect(() => {
    if (containerRef.current) {
      const checkScrollable = () => {
        const container = containerRef.current;
        if (container) {
          const canScroll = container.scrollHeight > container.clientHeight;
          setIsScrollable(canScroll);
          console.log('Container scrollable check:', {
            scrollHeight: container.scrollHeight,
            clientHeight: container.clientHeight,
            canScroll,
            overflowY: getComputedStyle(container).overflowY,
            height: getComputedStyle(container).height,
            maxHeight: getComputedStyle(container).maxHeight
          });
        }
      };
      
      // Check immediately
      checkScrollable();
      
      // Check after a short delay to ensure content is rendered
      const timer = setTimeout(checkScrollable, 100);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const CardShell: React.FC<{ title?: string; subtitle?: string; onClick?: () => void; preview?: React.ReactNode; disabled?: boolean; hideTitle?: boolean }>
    = ({ title, subtitle, onClick, preview, disabled, hideTitle }) => (
    <Card sx={{ aspectRatio: '1 / 1', borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
      {disabled ? (
        <Box sx={{ display: 'flex', flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
            {!hideTitle && title && <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>{title}</Typography>}
            {!hideTitle && subtitle && <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>{subtitle}</Typography>}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {preview}
            </Box>
          </CardContent>
        </Box>
      ) : (
        <CardActionArea onClick={onClick} sx={{ display: 'flex', flex: 1 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
            fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', letterSpacing: '0.06em' }}>
            {!hideTitle && title && <Typography variant="h6" sx={{ fontFamily: 'inherit' }}>{title}</Typography>}
            {!hideTitle && subtitle && <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'inherit' }}>{subtitle}</Typography>}
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {preview}
            </Box>
          </CardContent>
        </CardActionArea>
      )}
    </Card>
  );

  const PreviewMatrix = () => {
    // 2x2 quadrant representation with random dots, computed once per mount
    const DOTS = React.useMemo(() => {
      const pts: Array<{ x: number; y: number; c: string }> = [];
      const colors = ['#29b6f6', '#ab47bc', '#ff7043', '#66bb6a'];
      for (let q = 0; q < 4; q++) {
        const cx = q % 2; // 0 or 1
        const cy = Math.floor(q / 2); // 0 or 1
        const baseX = cx * 50; // percent
        const baseY = cy * 50; // percent
        for (let i = 0; i < 6; i++) {
          pts.push({
            x: baseX + 10 + Math.random() * 30,
            y: baseY + 10 + Math.random() * 30,
            // Mix colors within each quadrant; cycle with offset for variety
            c: colors[(i + q) % colors.length]
          });
        }
      }
      return pts;
    }, []);
    return (
      <Box sx={{ width: '90%', aspectRatio: '1', position: 'relative', borderRadius: 1, overflow: 'hidden', bgcolor: '#0f0f0f', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}>
        {/* Quadrants */}
        <Box sx={{ position:'absolute', left:'50%', top:0, bottom:0, width:1, bgcolor:'rgba(255,255,255,0.1)' }} />
        <Box sx={{ position:'absolute', top:'50%', left:0, right:0, height:1, bgcolor:'rgba(255,255,255,0.1)' }} />
        {/* Dots */}
        {DOTS.map((p, i) => (
          <Box key={i} sx={{ position:'absolute', left: `${p.x}%`, top: `${p.y}%`, width: 6, height: 6, bgcolor: p.c, borderRadius: '50%', transform: 'translate(-50%, -50%)' }} />
        ))}
      </Box>
    );
  };

  const PreviewCards = () => (
    <Box sx={{ width: '85%', height: '70%', display:'flex', alignItems:'center', justifyContent:'center', color:'#888' }}>
      <Typography variant="h4" sx={{ opacity: 0.85 }}>W.I.P</Typography>
    </Box>
  );

  const PreviewGraphs = () => (
    <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 1, width:'90%' }}>
      {/* Sparkline */}
      <svg viewBox="0 0 100 60" style={{ width:'100%' }}>
        <polyline points="0,50 15,42 30,47 45,35 60,25 75,28 90,18 100,22" fill="none" stroke="#64b5f6" strokeWidth="2" />
        {Array.from({length:8}).map((_,i)=> <circle key={i} cx={i*12.5} cy={[50,42,47,35,25,28,18,22][i]} r="2" fill="#90caf9" />)}
      </svg>
      {/* Mini radar */}
      <svg viewBox="0 0 100 100" style={{ width:'100%' }}>
        <g fill="none" stroke="rgba(255,255,255,0.15)">
          <polygon points="50,10 90,50 50,90 10,50" />
          <polygon points="50,20 80,50 50,80 20,50" />
          <polygon points="50,30 70,50 50,70 30,50" />
        </g>
        <polygon points="50,22 70,50 50,75 28,50" fill="rgba(102,187,106,0.35)" stroke="#66bb6a" />
      </svg>
    </Box>
  );

  // Separate cards for Centroid and Memory will use dedicated previews below

  return (
    <Box 
      ref={containerRef}
      className="homehub-mobile mobile-container"
      sx={{ 
        m: 'auto', 
        width: '100%', 
        maxWidth: { xs: '100%', lg: 1200 }, 
        display: 'flex', 
        flexDirection: 'column',
        fontFamily: '"DS-Digital", ui-monospace, Menlo, Consolas, monospace', 
        letterSpacing: '0.06em', 
        position: 'relative'
      }}
    >

      <Box className="mobile-grid">
        <CardShell title="GRAPPLING PRIMITIVES" subtitle="Concepts Mapping" onClick={props.goMatrix} preview={<PreviewMatrix />} />
        <CardShell title="BJJ Visualizations" onClick={props.goGraphs} preview={<PreviewGraphs />} />
        <CardShell title="Centroid" onClick={() => props.goGames('centroid')} preview={<CentroidCardPreview />} />
        <CardShell title="JJJ Memory" onClick={() => props.goGames('memory')} preview={<MemoryCardPreview />} />
        <CardShell hideTitle onClick={props.goStories} preview={<StoriesCardPreview />} />
        <CardShell hideTitle onClick={() => { props.goCoach(); setTimeout(() => { if (typeof window !== 'undefined') window.location.hash = 'timer'; }, 0); }} preview={<TimerCardPreview />} />
        <CardShell hideTitle onClick={props.goSkillCheck} preview={<SkillCheckCardPreview />} />
        <CardShell title="Belt Dropout" onClick={props.goBeltDropout} preview={<BeltDropoutCardPreview />} />
        <CardShell title="Training" onClick={props.goTraining} preview={<TrainingCardPreview />} />
        <CardShell title="Weight & Gi Size" onClick={props.goWeightClass} preview={<Box sx={{ width:'80%', textAlign:'center', color:'#90caf9'}}>
          <Typography variant="h4" sx={{ fontFamily:'inherit' }}>⚖️</Typography>
          <Typography variant="body2" sx={{ opacity:0.8 }}>IBJJF + Gi</Typography>
        </Box>} />
        <CardShell title="Others" onClick={props.goOthers} preview={<PreviewCards />} />
      </Box>

      {/* Mobile scroll indicator */}
      <Box 
        className="mobile-only"
        sx={{ 
          textAlign: 'center', 
          py: 2, 
          color: 'rgba(255,255,255,0.6)',
          fontSize: 'var(--mobile-font-size-small)'
        }}
      >
        ↓ Scroll to see all modules ↓
      </Box>

      {/* Mobile scroll to top button - only show when scrollable */}
      {isScrollable && (
        <Box 
          className="mobile-only mobile-scroll-top"
          onClick={() => {
            // CRITICAL: Scroll the container, not the window
            console.log('Scroll button clicked, containerRef:', containerRef.current);
            console.log('Container scrollTop:', containerRef.current?.scrollTop);
            console.log('Container scrollHeight:', containerRef.current?.scrollHeight);
            console.log('Container clientHeight:', containerRef.current?.clientHeight);
            
            if (containerRef.current) {
              containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
              console.log('Scrolling to top...');
            } else {
              console.error('Container ref not found!');
            }
          }}
          sx={{ 
            position: 'fixed',
            bottom: { xs: 'calc(env(safe-area-inset-bottom) + 5rem)', md: '5rem' },
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'var(--touch-target)',
            height: 'var(--touch-target)',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            fontSize: 'var(--mobile-font-size-large)',
            transition: 'all 0.2s ease',
            /* CRITICAL: Ensure button is clickable */
            pointerEvents: 'auto',
            /* CRITICAL: Ensure button is above other content */
            zIndex: 1001,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
              transform: 'translateX(-50%) scale(1.1)'
            }
          }}
        >
          ↑
        </Box>
      )}
      
      {/* Help button at bottom right */}
      <Box 
        className="mobile-help-button"
        onClick={() => {
          alert("Jelaludo's attempt at a BJJ OS, pouring decades of notes into one app with multiple modules, work in progress, ossss");
        }}
      >
        ?
      </Box>
    </Box>
  );
};

export default HomeHub;


